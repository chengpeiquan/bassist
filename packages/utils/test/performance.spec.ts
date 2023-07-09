import { Mock, afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { sleep, debounce, throttle } from '..'

const mockFn = vi.fn()

function advanceTimersByTime(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
    vi.advanceTimersByTime(ms)
  })
}

describe('performance', () => {
  it('sleep', async () => {
    async function diff(ms: number) {
      const start = Date.now()
      await sleep(ms)
      const end = Date.now()
      return end - start > ms
    }

    expect(await diff(0)).toBeTruthy()
    expect(await diff(500)).toBeTruthy()
    expect(await diff(2000)).toBeTruthy()
    expect(await diff(3000)).toBeTruthy()
  }, 100000)

  it('debounce', async () => {
    const delayedFn = debounce(mockFn, 100)

    it('should delay execution by specified time', async () => {
      delayedFn()
      expect(mockFn).not.toBeCalled()
      await advanceTimersByTime(100)
      expect(mockFn).toBeCalled()
    })

    it('should execute only the last call when called continuously', async () => {
      delayedFn()
      delayedFn()
      delayedFn()
      await advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    it('should pass arguments to the debounced function', async () => {
      delayedFn(1, 2, 3)
      await advanceTimersByTime(100)
      expect(mockFn).toBeCalledWith(1, 2, 3)
    })
  })

  it('throttle', async () => {
    let testFunction: Mock<any, any>
    let throttledFunction: (this: unknown, ...args: any) => void

    beforeEach(() => {
      testFunction = vi.fn()
      throttledFunction = throttle(testFunction, 1000)
      vi.useFakeTimers()
    })

    afterEach(() => {
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
