import { describe, expect, it } from 'vitest'
import {
  extractNumber,
  formatAmount,
  capitalize,
  escapeRegExp,
  sortKeys,
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
})
