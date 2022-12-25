import { describe, expect, it } from 'vitest'
import { randomNumber, randomUA } from '..'

console.log(randomUA())
console.log(randomUA())
console.log(randomUA())

describe('randomNumber', () => {
  function inRange(value: number, min: number, max: number) {
    return value >= min && value <= max
  }

  it('Valid data', () => {
    expect(inRange(randomNumber(), 0, 100)).toBeTruthy()
    expect(inRange(randomNumber(-100, -50), -100, -50)).toBeTruthy()
  })
})
