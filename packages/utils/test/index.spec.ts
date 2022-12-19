import { describe, expect, test } from 'vitest'
import md5 from '.'

describe('md5', () => {
  test('Encrypt `Hello World`', () => {
    expect(md5('Hello World')).toBe('b10a8db164e0754105b7a99be72e3fe5')
  })
})

describe('md5', () => {
  test('Encrypt `123456`', () => {
    expect(md5('123456')).toBe('e10adc3949ba59abbe56e057f20f883e')
  })
})

describe('md5', () => {
  test('Encrypt `true`', () => {
    expect(md5('true')).toBe('b326b5062b2f0e69046810717534cb09')
  })
})

describe('md5', () => {
  test('Encrypt `[1, 2, 3]`', () => {
    expect(md5([1, 2, 3])).toBe('5289df737df57326fcdd22597afb1fac')
  })
})
