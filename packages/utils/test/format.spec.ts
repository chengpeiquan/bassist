import { describe, expect, it } from 'vitest'
import {
  extractNumber,
  formatAmount,
  ellipsis,
  capitalize,
  escapeRegExp,
  sortKeys,
  unique,
} from '..'

describe('format', () => {
  it('extractNumber', () => {
    expect(extractNumber('akdhaskd2')).toBe('2')
    expect(extractNumber('阿斯0达克哈1234克qqwer5')).toBe('12345')
  })

  it('formatAmount', () => {
    expect(formatAmount('4')).toBe('4.00')
    expect(formatAmount('1.5')).toBe('1.50')
    expect(formatAmount('0.44565')).toBe('0.45')
  })

  it('ellipsis', () => {
    expect(ellipsis('Hello World', 5)).toBe('Hello ...')
    expect(ellipsis('Hello World', 8)).toBe('Hello Wo ...')
  })

  it('capitalize', () => {
    expect(capitalize('4')).toBe('4')
    expect(capitalize('a')).toBe('A')
    expect(capitalize('abc')).toBe('Abc')
    expect(capitalize('abc')).toBe('Abc')
    expect(capitalize('!abc')).toBe('!abc')
    expect(capitalize('')).toBe('')
  })

  it('escapeRegExp', () => {
    expect(escapeRegExp('@bassist/utils')).toBe('@bassist/utils')
    expect(escapeRegExp('https://example.com/foo')).toBe(
      'https://example\\.com/foo'
    )
  })

  it('sortKeys', () => {
    expect(
      sortKeys({
        c: 3,
        d: { c: 3, a: 1, b: 2 },
        a: 1,
        e: [
          { c: 3, a: 1, b: 2 },
          { c: 3, a: 1, b: 2 },
        ],
        b: 2,
      })
    ).toEqual({
      a: 1,
      b: 2,
      c: 3,
      d: { a: 1, b: 2, c: 3 },
      e: [
        { a: 1, b: 2, c: 3 },
        { a: 1, b: 2, c: 3 },
      ],
    })

    expect(
      sortKeys([
        { c: 3, a: 1, b: 2 },
        { c: 3, a: 1, b: 2 },
      ])
    ).toEqual([
      { a: 1, b: 2, c: 3 },
      { a: 1, b: 2, c: 3 },
    ])

    expect(null).toBeNull()
    expect(undefined).toBeUndefined()
    expect('foo').toBe('foo')
  })

  it('unique', () => {
    expect(
      unique({
        target: 'foo',
        list: [
          { foo: 1, bar: 1 },
          { foo: 1, bar: 2 },
          { foo: 2, bar: 1 },
        ],
      })
    ).toEqual([
      { foo: 1, bar: 1 },
      { foo: 2, bar: 1 },
    ])

    expect(
      unique({
        target: 'bar',
        list: [
          { foo: 1, bar: 1 },
          { foo: 1, bar: 2 },
          { foo: 2, bar: 1 },
        ],
      })
    ).toEqual([
      { foo: 1, bar: 1 },
      { foo: 1, bar: 2 },
    ])

    expect(
      unique({
        target: 'foo',
        list: [
          { foo: 1, bar: 1 },
          { foo: 2, bar: null },
          { foo: 3, bar: [1, 2, 3] },
          { foo: 3, bar: [] },
        ],
      })
    ).toEqual([
      { foo: 1, bar: 1 },
      { foo: 2, bar: null },
      { foo: 3, bar: [1, 2, 3] },
    ])
  })
})
