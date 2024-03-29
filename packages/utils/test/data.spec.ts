import { describe, expect, it } from 'vitest'
import {
  getDataType,
  isObject,
  isArray,
  inRange,
  isFunction,
  isAsyncFunction,
  isPromise,
  isEven,
  isOdd,
} from '..'

class Foo {
  bar() {}
}

const obj = {
  then() {},
}

describe('getDataType', () => {
  it('Valid data', () => {
    expect(getDataType('')).toBe('String')
    expect(getDataType(String(1))).toBe('String')
    expect(getDataType(new String(1))).toBe('String')
    expect(getDataType(null)).toBe('Null')
    expect(getDataType(undefined)).toBe('Undefined')
    expect(getDataType(new Date())).toBe('Date')
    expect(getDataType(/foo/)).toBe('RegExp')
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

describe('isAsyncFunction', () => {
  it('Valid data', () => {
    expect(isAsyncFunction(async () => {})).toBeTruthy()
    expect(isAsyncFunction(async function () {})).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isAsyncFunction(new Function())).toBeFalsy()
    expect(isAsyncFunction(function () {})).toBeFalsy()
    expect(isAsyncFunction(() => {})).toBeFalsy()
    expect(isAsyncFunction(Foo)).toBeFalsy()
    expect(isAsyncFunction(new Foo().bar)).toBeFalsy()
  })
})

describe('isEven', () => {
  it('Valid data', () => {
    expect(isEven(0)).toBeTruthy()
    expect(isEven(2)).toBeTruthy()
    expect(isEven(4)).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isEven(-1)).toBeFalsy()
    expect(isEven(1)).toBeFalsy()
    expect(isEven(1.5)).toBeFalsy()
    expect(isEven(3)).toBeFalsy()
    expect(isEven(15)).toBeFalsy()
  })
})

describe('isFunction', () => {
  it('Valid data', () => {
    expect(isFunction(new Function())).toBeTruthy()
    expect(isFunction(function () {})).toBeTruthy()
    expect(isFunction(() => {})).toBeTruthy()
    expect(isFunction(async () => {})).toBeTruthy()
    expect(isFunction(async function () {})).toBeTruthy()
    expect(isFunction(Foo)).toBeTruthy()
    expect(isFunction(new Foo().bar)).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isFunction(1)).toBeFalsy()
    expect(isFunction('1')).toBeFalsy()
    expect(isFunction(undefined)).toBeFalsy()
    expect(isFunction(null)).toBeFalsy()
    expect(isFunction({})).toBeFalsy()
    expect(isFunction([])).toBeFalsy()
  })
})

describe('isOdd', () => {
  it('Valid data', () => {
    expect(isOdd(-1)).toBeTruthy()
    expect(isOdd(1)).toBeTruthy()
    expect(isOdd(3)).toBeTruthy()
    expect(isOdd(15)).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isOdd(0)).toBeFalsy()
    expect(isOdd(1.5)).toBeFalsy()
    expect(isOdd(2)).toBeFalsy()
    expect(isOdd(4)).toBeFalsy()
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

describe('isPromise', () => {
  it('Valid data', () => {
    expect(isPromise(new Promise<void>((r) => r()))).toBeTruthy()
    expect(isPromise(Promise.resolve())).toBeTruthy()
    expect(isPromise((async () => {})())).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isPromise(obj)).toBeFalsy()
    expect(isPromise('')).toBeFalsy()
    expect(isPromise(null)).toBeFalsy()
    expect(isPromise(undefined)).toBeFalsy()
    expect(isPromise(Object(1))).toBeFalsy()
    expect(isPromise({})).toBeFalsy()
    expect(isPromise(new Object())).toBeFalsy()
    expect(isPromise(Object.create({ foo: 1 }))).toBeFalsy()
  })
})

describe('inRange', () => {
  it('Valid data', () => {
    expect(inRange({ num: 1, min: 0, max: 5 })).toBeTruthy()
    expect(inRange({ num: 1, min: -5, max: 5 })).toBeTruthy()
    expect(inRange({ num: 1, min: 5, max: -5 })).toBeTruthy()
    expect(
      inRange({ num: -4, min: -5, max: 5, includeMin: false }),
    ).toBeTruthy()
    expect(inRange({ num: 4, min: -5, max: 5, includeMax: false })).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(inRange({ num: 10, min: 0, max: 5 })).toBeFalsy()
    expect(inRange({ num: -99, min: -5, max: 5 })).toBeFalsy()
    expect(inRange({ num: NaN, min: 5, max: -5 })).toBeFalsy()
    expect(inRange({ num: -5, min: -5, max: 5, includeMin: false })).toBeFalsy()
    expect(inRange({ num: 5, min: -5, max: 5, includeMax: false })).toBeFalsy()
  })
})
