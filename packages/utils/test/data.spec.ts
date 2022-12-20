import { describe, expect, it } from 'vitest'
import { getDataType, isObject } from '..'

describe('getDataType', () => {
  it('Valid data', () => {
    expect(getDataType('')).toBe('String')
    expect(getDataType(String(1))).toBe('String')
    expect(getDataType(new String(1))).toBe('String')
    expect(getDataType(null)).toBe('Null')
    expect(getDataType(undefined)).toBe('Undefined')
    expect(getDataType(new Date())).toBe('Date')
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
