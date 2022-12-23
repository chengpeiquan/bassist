import { describe, expect, it } from 'vitest'
import { LocalStorage } from '..'

describe('storage', () => {
  it('LocalStorage', async () => {
    const ls = new LocalStorage('test-ls')
    expect(ls.prefix).toBe('test-ls')
    expect(ls.count()).toBe(0)
    expect(ls.list()).toStrictEqual([])
  })
})
