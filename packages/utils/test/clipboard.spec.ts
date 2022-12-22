import { describe, expect, it } from 'vitest'
import { clipboard } from '..'

describe('env', () => {
  it('Valid data', () => {
    console.log('clipboard', clipboard.isSupported)

    // console.log(navigator)
    // console.log(navigator.clipboard)
    // expect(isServer).toBeTruthy()
  })
  it('Invalid data', () => {
    // expect(isBrowser).toBeFalsy()
  })
})
