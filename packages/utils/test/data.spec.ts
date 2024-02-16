import { describe, expect, it } from 'vitest'
import { getDataType, isObject, isArray } from '..'

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

describe('isArray', () => {
  it('Valid data', () => {
    expect(isArray([])).toBeTruthy()
    expect(isArray(new Array(1))).toBeTruthy()
    expect(isArray(Array.from(new Set()))).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isArray({})).toBeFalsy()
    expect(isArray(new Object())).toBeFalsy()
    expect(isArray(Object.create([]))).toBeFalsy()
    expect(isArray(Object.create({ foo: 1 }))).toBeFalsy()
    expect(isArray('')).toBeFalsy()
    expect(isArray(null)).toBeFalsy()
    expect(isArray(undefined)).toBeFalsy()
    expect(isArray(Object(1))).toBeFalsy()
  })
})

describe('isObject', () => {
  it('Valid data', () => {
    expect(isObject({})).toBeTruthy()
    expect(isObject(new Object())).toBeTruthy()
    expect(isObject(Object.create({ foo: 1 }))).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isObject('')).toBeFalsy()
    expect(isObject(null)).toBeFalsy()
    expect(isObject(undefined)).toBeFalsy()
    expect(isObject(Object(1))).toBeFalsy()
  })
})
