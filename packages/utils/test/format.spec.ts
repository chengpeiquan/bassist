import { describe, expect, it } from 'vitest'
import {
  extractNumber,
  formatAmount,
  ellipsis,
  capitalize,
  kebabCase,
  camelCase,
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

  it('kebabCase', () => {
    expect(kebabCase('4')).toBe('4')
    expect(kebabCase('a')).toBe('a')
    expect(kebabCase('AbcDef')).toBe('abc-def')
    expect(kebabCase('Abc-Def')).toBe('abc--def')
    expect(kebabCase('abc_efg_hijklmn')).toBe('abc-efg-hijklmn')
    expect(kebabCase('!abc')).toBe('!abc')
    expect(kebabCase('')).toBe('')
  })

  it('camelCase', () => {
    expect(camelCase('4')).toBe('4')
    expect(camelCase('a')).toBe('a')
    expect(camelCase('AbcDef')).toBe('abcDef')
    expect(camelCase('Abc-Def')).toBe('abcDef')
    expect(camelCase('abc_efg_hijklmn')).toBe('abcEfgHijklmn')
    expect(camelCase('!abc')).toBe('!abc')
    expect(camelCase('')).toBe('')
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
        primaryKey: 'foo',
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
        primaryKey: 'bar',
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
        primaryKey: 'foo',
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
