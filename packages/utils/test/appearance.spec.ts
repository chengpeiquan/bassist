import { describe, expect, it } from 'vitest'
import { checkIsDark, isDark } from '..'

describe('appearance', () => {
  it('Invalid data', () => {
    expect(isDark).toBeFalsy()
    expect(checkIsDark()).toBeFalsy()
  })
})
