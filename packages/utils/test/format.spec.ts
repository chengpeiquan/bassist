import { describe, expect, it } from 'vitest'
import { extractNumber, formatAmount, capitalize } from '..'

describe('query', () => {
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
})
