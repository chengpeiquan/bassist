import { describe, expect, it } from 'vitest'
import { randomNumber } from '..'

describe('randomNumber', () => {
  function inRange(value: number, min: number, max: number) {
    return value >= min && value <= max
  }

  it('Valid data', () => {
    expect(inRange(randomNumber(), 0, 100)).toBeTruthy()
    expect(inRange(randomNumber(-100, -50), -100, -50)).toBeTruthy()
  })
  // it('Invalid data', () => {
  //   expect(randomNumber('13800138000 ')).toBeFalsy()
  //   expect(randomNumber('1380013800')).toBeFalsy()
  //   expect(randomNumber(123456)).toBeFalsy()
  //   expect(randomNumber('hello')).toBeFalsy()
  // })
})
