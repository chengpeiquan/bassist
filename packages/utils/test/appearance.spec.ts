import { describe, expect, it } from 'vitest'
import { isDark, isLight } from '..'

describe('appearance', () => {
  it('Invalid data', () => {
    expect(isDark()).toBeFalsy()
    expect(isLight()).toBeFalsy()
  })
})
