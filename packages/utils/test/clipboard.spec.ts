import { describe, expect, it } from 'vitest'
import { clipboard } from '..'

describe('env', () => {
  it('Valid data', async () => {
    expect(clipboard.text).toBe('')
    expect(await clipboard.read()).toBe('')
  })
  it('Invalid data', async () => {
    expect(clipboard.isSupported).toBeFalsy()
    expect(await clipboard.copy('hello')).toBeFalsy()
    expect(await clipboard.write('hello')).toBeFalsy()
  })
})
