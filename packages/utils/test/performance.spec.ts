import {
  type Mock,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { sleep, debounce, throttle } from '..'

const mockFn = vi.fn()

function advanceTimersByTime(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
    vi.advanceTimersByTime(ms)
  })
}

describe('performance', () => {
  beforeEach(() => {
    mockFn.mockReset()
  })

  it('sleep', async () => {
    async function diff(ms: number) {
      const start = Date.now()
      await sleep(ms)
      const end = Date.now()
      return end - start >= ms
    }

    expect(await diff(0)).toBeTruthy()
    expect(await diff(500)).toBeTruthy()
    expect(await diff(2000)).toBeTruthy()
    expect(await diff(3000)).toBeTruthy()
  }, 100000)

  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
      vi.clearAllTimers()
    })

    it('should delay execution by specified time', async () => {
      const delayedFn = debounce(mockFn, 100)

      delayedFn()
      expect(mockFn).not.toBeCalled()
      await advanceTimersByTime(100)
      expect(mockFn).toBeCalled()
    })

    it('should execute only the last call when called continuously', async () => {
      const delayedFn = debounce(mockFn, 100)

      delayedFn()
      delayedFn()
      delayedFn()
      await advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should pass arguments to the debounced function', async () => {
      const delayedFn = debounce(mockFn, 100)

      delayedFn(1, 2, 3)
      await advanceTimersByTime(100)
      expect(mockFn).toBeCalledWith(1, 2, 3)
    })
  })

  describe('throttle', () => {
    let testFunction: Mock
    let throttledFunction: (this: unknown, ...args: any) => void

    beforeEach(() => {
      vi.useFakeTimers()
      testFunction = vi.fn()
      throttledFunction = throttle(testFunction, 1000)
    })

    afterEach(() => {
      vi.useRealTimers()
      vi.clearAllTimers()
    })

    it('should call the function immediately when called for the first time', () => {
      throttledFunction()
      expect(testFunction).toHaveBeenCalledTimes(1)
    })

    it('should not call the function again within the time limit', () => {
      throttledFunction()
      vi.advanceTimersByTime(500)
      throttledFunction()
      expect(testFunction).toHaveBeenCalledTimes(1)
    })

    it('should call the function again after the time limit', () => {
      throttledFunction()
      vi.advanceTimersByTime(1000)
      throttledFunction()
      expect(testFunction).toHaveBeenCalledTimes(2)
    })
  })
})
