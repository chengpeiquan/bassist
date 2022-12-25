import { describe, expect, it } from 'vitest'
import { isBrowser, isServer } from '..'

describe('device', () => {
  it('Valid data', () => {
    expect(isServer).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isBrowser).toBeFalsy()
  })
})
