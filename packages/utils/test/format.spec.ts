import { describe, expect, it } from 'vitest'
import {
  extractNumber,
  formatAmount,
  ellipsis,
  capitalize,
  kebabCase,
  camelCase,
  pascalCase,
  escapeRegExp,
  sortKeys,
  unique,
  excludeFields,
  formatTime,
  formatDuration,
  removeHtmlTags,
  toArray,
  ensurePrefix,
  ensureSuffix,
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
    expect(capitalize('abcDef')).toBe('AbcDef')
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

  it('pascalCase', () => {
    expect(pascalCase('4')).toBe('4')
    expect(pascalCase('a')).toBe('A')
    expect(pascalCase('AbcDef')).toBe('AbcDef')
    expect(pascalCase('Abc-Def')).toBe('AbcDef')
    expect(pascalCase('abc_efg_hijklmn')).toBe('AbcEfgHijklmn')
    expect(pascalCase('!abc')).toBe('!abc')
    expect(pascalCase('')).toBe('')
  })

  it('escapeRegExp', () => {
    expect(escapeRegExp('@bassist/utils')).toBe('@bassist/utils')
    expect(escapeRegExp('https://example.com/foo')).toBe(
      'https://example\\.com/foo',
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
      }),
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
      ]),
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
      }),
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
      }),
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
      }),
    ).toEqual([
      { foo: 1, bar: 1 },
      { foo: 2, bar: null },
      { foo: 3, bar: [1, 2, 3] },
    ])
  })

  it('excludeFields', () => {
    const obj = {
      foo: 'foo',
      bar: 'bar',
      baz: {
        foo: 'foo',
        bar: 'bar',
      },
      num: 1,
      bool: true,
    }

    expect(excludeFields(obj, ['foo', 'bar'])).toEqual({
      baz: {
        foo: 'foo',
        bar: 'bar',
      },
      num: 1,
      bool: true,
    })

    expect(excludeFields(obj, ['baz', 'num'])).toEqual({
      foo: 'foo',
      bar: 'bar',
      bool: true,
    })

    expect(excludeFields(obj, [])).toEqual(obj)
    expect(excludeFields(obj, ['test'])).toEqual(obj)
  })

  it('formatTime', () => {
    // A date string in standard ISO 8601 format
    expect(formatTime(new Date('2023-01-01'))).toBe('2023-01-01 08:00:00')

    // Non-standard date string format
    expect(formatTime(new Date('2023/01/01'))).toBe('2023-01-01 00:00:00')

    expect(formatTime(new Date('2023-01-01 14:05:59'))).toBe(
      '2023-01-01 14:05:59',
    )
    expect(formatTime(new Date('2023-01-01 00:05:59'))).toBe(
      '2023-01-01 00:05:59',
    )
    expect(formatTime(new Date('2023/01/01 00:05:59'))).toBe(
      '2023-01-01 00:05:59',
    )
    expect(formatTime(new Date('2023-01-01 14:05:59'), true)).toBe('2023-01-01')
  })

  it('formatDuration', () => {
    expect(
      formatDuration(+new Date('2023-01-02') - +new Date('2023-01-01')),
    ).toBe('1 天')

    expect(
      formatDuration(
        +new Date('2023-01-02 04:00:00') - +new Date('2023-01-01 00:00:00'),
      ),
    ).toBe('1 天 4 小时')

    expect(
      formatDuration(
        +new Date('2023-01-02 04:15:00') - +new Date('2023-01-01 00:00:00'),
      ),
    ).toBe('1 天 4 小时 15 分钟')

    expect(
      formatDuration(
        +new Date('2023-01-12 04:15:36') - +new Date('2023-01-01 00:00:00'),
      ),
    ).toBe('11 天 4 小时 15 分钟 36 秒')

    expect(
      formatDuration(
        +new Date('2023-01-12 04:15:36') - +new Date('2023-01-01 00:00:00'),
        {
          days: 'Days',
          hours: 'Hours',
          minutes: 'Minutes',
          seconds: 'Seconds',
        },
      ),
    ).toBe('11 Days 4 Hours 15 Minutes 36 Seconds')
  })

  it('removeHtmlTags', () => {
    expect(removeHtmlTags('<p>hello</>')).toBe('hello')
    expect(removeHtmlTags('<p>hello <span>world</span></>')).toBe('hello world')
  })

  it('toArray', () => {
    expect(toArray([1, 2, 3])).toEqual([1, 2, 3])
    expect(toArray(1)).toEqual([1])
    expect(toArray()).toEqual([])
  })

  it('ensurePrefix', () => {
    expect(ensurePrefix('https://', 'https://example.com')).toBe(
      'https://example.com',
    )
    expect(ensurePrefix('https://', 'example.com')).toBe('https://example.com')
  })

  it('ensureSuffix', () => {
    expect(ensureSuffix('/', '/path/to')).toBe('/path/to/')
    expect(ensureSuffix('/', '/path/to/')).toBe('/path/to/')
  })
})
