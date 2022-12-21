import { describe, expect, it } from 'vitest'
import { getDataType, isObject } from '..'

describe('getDataType', () => {
  it('Valid data', () => {
    expect(getDataType('')).toBe('string')
    expect(getDataType(String(1))).toBe('string')
    expect(getDataType(new String(1))).toBe('string')
    expect(getDataType(null)).toBe('null')
    expect(getDataType(undefined)).toBe('undefined')
    expect(getDataType(new Date())).toBe('date')
    expect(getDataType(/foo/)).toBe('regexp')
  })
})

describe('isObject', () => {
  it('Valid data', () => {
    expect(isObject({})).toBeTruthy
    expect(isObject(new Object())).toBeTruthy
    expect(isObject(Object.create({ foo: 1 }))).toBeTruthy
  })
  it('Invalid data', () => {
    expect(isObject('')).toBeFalsy
    expect(isObject(null)).toBeFalsy
    expect(isObject(undefined)).toBeFalsy
  })
})
