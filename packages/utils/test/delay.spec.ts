import { describe, expect, it } from 'vitest'
import { sleep } from '..'

describe('delay', () => {
  async function diff(ms: number) {
    const start = Date.now()
    await sleep(ms)
    const end = Date.now()
    return end - start > ms
  }

  it('sleep', async () => {
    expect(await diff(0)).toBeTruthy()
    expect(await diff(500)).toBeTruthy()
    expect(await diff(2000)).toBeTruthy()
    expect(await diff(3000)).toBeTruthy()
  }, 100000)
})
