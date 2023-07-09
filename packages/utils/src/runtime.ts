/**
 * Common runtime environment types
 *
 * @category runtime
 */
export type RuntimeEnv = 'development' | 'test' | 'production' | undefined

/**
 * Get current runtime environment
 *
 * @precondition The `cross-env` package is installed
 *
 * @category runtime
 */
export function getRuntimeEnv() {
  try {
    return process.env.NODE_ENV as RuntimeEnv
  } catch (e) {
    return undefined
  }
}

/**
 * Current runtime environment
 *
 * @category runtime
 */
export const runtimeEnv = getRuntimeEnv()

/**
 * Determine whether the specified runtime environment is currently
 *
 * @precondition The `cross-env` package is installed
 *
 * @category runtime
 */
export function checkRuntimeEnv(runtimeEnv: string) {
  try {
    return process.env.NODE_ENV === runtimeEnv
  } catch (e) {
    return false
  }
}

/**
 * Determine whether the current runtime is development
 *
 * @category runtime
 */
export const isDevRuntime = checkRuntimeEnv('development')

/**
 * Determine whether the current runtime is test
 *
 * @category runtime
 */
export const isTestRuntime = checkRuntimeEnv('test')

/**
 * Determine whether the current runtime is production
 *
 * @category runtime
 */
export const isProdRuntime = checkRuntimeEnv('production')
