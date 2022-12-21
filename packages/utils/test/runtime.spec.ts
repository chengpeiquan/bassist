import { describe, expect, it } from 'vitest'
import {
  getRuntimeEnv,
  isDevRuntime,
  isProdRuntime,
  isTestRuntime,
  runtimeEnv,
} from '..'

describe('runtime', () => {
  it('Valid data', () => {
    expect(runtimeEnv).toBe('test')
    expect(getRuntimeEnv()).toBe('test')
    expect(isTestRuntime).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isDevRuntime).toBeFalsy()
    expect(isProdRuntime).toBeFalsy()
  })
})
