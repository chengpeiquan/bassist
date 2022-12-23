import { describe, expect, it } from 'vitest'
import { LocalStorage } from '..'

describe('storage', () => {
  it('LocalStorage Default', () => {
    const ls = new LocalStorage('test-ls-default')
    expect(ls.prefix).toBe('test-ls-default')
    expect(ls.count()).toBe(0)
    expect(ls.list()).toStrictEqual([])
  })

  it('LocalStorage With Data', () => {
    const ls = new LocalStorage('test-ls')
    expect(ls.prefix).toBe('test-ls')

    ls.set('foo', 'foo')
    expect(ls.count()).toBe(1)
    expect(ls.get('foo')).toBe('foo')
    expect(ls.list()).toStrictEqual(['foo'])

    ls.set('bar', 1)
    expect(ls.get('bar')).toBe(1)

    ls.set('baz', [1, 2, 3])
    expect(ls.get('baz')).toStrictEqual([1, 2, 3])

    ls.set('qux', {
      foo: 'foo',
      bar: 1,
    })
    expect(ls.get('qux')).toStrictEqual({
      foo: 'foo',
      bar: 1,
    })

    ls.remove('qux')
    expect(ls.get('qux')).toBeNull()

    ls.clear()
    expect(ls.count()).toBe(0)
  })
})
