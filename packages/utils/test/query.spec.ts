import { describe, expect, it } from 'vitest'
import { extractQueryInfo, getQuery, parseQuery, stringifyQuery } from '..'

describe('query', () => {
  it('parseQuery', () => {
    expect(parseQuery('https://example.com/?a=1&b=2')).toStrictEqual({
      a: '1',
      b: '2',
    })

    expect(parseQuery('https://example.com/?a= &b=')).toStrictEqual({
      a: ' ',
      b: '',
    })

    expect(
      parseQuery('https://example.com/?url=https%3A%2F%2Fexample.com'),
    ).toStrictEqual({
      url: 'https://example.com',
    })

    expect(parseQuery('https://example.com/?nums=1,2,3')).toStrictEqual({
      nums: '1,2,3',
    })

    expect(parseQuery('https://example.com/#/foo?a=1&b=2')).toStrictEqual({
      a: '1',
      b: '2',
    })

    expect(parseQuery('https://example.com/?a=1&b=2#/foo')).toStrictEqual({
      a: '1',
      b: '2',
    })
  })

  it('extractQueryInfo', () => {
    expect(
      extractQueryInfo('https://example.com/?path=%2Ffoo&a=1&b=2'),
    ).toStrictEqual({
      path: '/foo',
      params: {
        a: '1',
        b: '2',
      },
    })

    expect(extractQueryInfo('https://example.com/?a=1&b=2')).toStrictEqual({
      path: '',
      params: {
        a: '1',
        b: '2',
      },
    })
  })

  it('getQuery', () => {
    expect(getQuery('b', 'https://example.com/?a=1&b=2')).toBe('2')

    expect(
      getQuery('url', 'https://example.com/?url=https%3A%2F%2Fexample.com'),
    ).toBe('https://example.com')
  })

  it('stringifyQuery', () => {
    expect(
      stringifyQuery({
        a: 1,
        b: 2,
      }),
    ).toBe('a=1&b=2')

    expect(
      stringifyQuery({
        url: 'https://example.com',
      }),
    ).toBe('url=https%3A%2F%2Fexample.com')
  })
})
