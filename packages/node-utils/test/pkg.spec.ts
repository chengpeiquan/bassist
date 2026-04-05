import { afterEach, describe, expect, it } from 'vitest'
import {
  isValidPackageName,
  toValidPackageName,
  getPackageManagerByUserAgent,
} from '..'

describe('pkg', () => {
  const originalUserAgent = process.env.npm_config_user_agent

  afterEach(() => {
    process.env.npm_config_user_agent = originalUserAgent
  })

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
    process.env.npm_config_user_agent =
      'pnpm/10.13.1 npm/? node/v22.19.0 darwin arm64'

    expect(getPackageManagerByUserAgent().name).toBe('pnpm')
    expect(getPackageManagerByUserAgent().version).toBe('10.13.1')
  })

  it('getPackageManagerByUserAgent fallback', () => {
    delete process.env.npm_config_user_agent

    expect(getPackageManagerByUserAgent()).toEqual({
      name: '',
      version: '0.0.0',
    })
  })
})
