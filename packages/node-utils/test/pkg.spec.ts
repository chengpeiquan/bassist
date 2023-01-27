import { describe, expect, it } from 'vitest'
import {
  isValidPackageName,
  toValidPackageName,
  getPackageManagerByUserAgent,
} from '..'

describe('pkg', () => {
  it('isValidPackageName', () => {
    expect(isValidPackageName('hello')).toBeTruthy()
    expect(isValidPackageName('hello123')).toBeTruthy()
    expect(isValidPackageName('113hello')).toBeTruthy()
    expect(isValidPackageName('hello-world')).toBeTruthy()
    expect(isValidPackageName('hello_world')).toBeTruthy()
    expect(isValidPackageName('hello.world')).toBeTruthy()
    expect(isValidPackageName('@hello/world')).toBeTruthy()
    expect(isValidPackageName('@hello/w-orld')).toBeTruthy()

    expect(isValidPackageName('!hello')).toBeFalsy()
    expect(isValidPackageName('%hello')).toBeFalsy()
    expect(isValidPackageName('Hello')).toBeFalsy()
    expect(isValidPackageName('HELLO')).toBeFalsy()
    expect(isValidPackageName('hello world')).toBeFalsy()
  })

  it('toValidPackageName', () => {
    expect(toValidPackageName('HELLO')).toBe('hello')
    expect(toValidPackageName('hello world')).toBe('hello-world')
  })

  it('getPackageManagerByUserAgent', () => {
    console.log('userAgent', process.env.npm_config_user_agent)
    expect(getPackageManagerByUserAgent().name).toBe('pnpm')
  })
})
