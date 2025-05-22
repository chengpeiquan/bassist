/**
 * Common runtime environment types
 *
 * @category Runtime
 */
export type RuntimeEnv = 'dev' | 'development' | 'test' | 'prod' | 'production'

/**
 * Get current runtime environment
 *
 * @category Runtime
 * @precondition The `cross-env` package is installed
 */
export function getRuntimeEnv() {
  try {
    return process.env.NODE_ENV as RuntimeEnv
  } catch {
    return undefined
  }
}

/**
 * Current runtime environment
 *
 * @category Runtime
 */
export const runtimeEnv = getRuntimeEnv()

/**
 * Determine whether the specified runtime environment is currently
 *
 * @category Runtime
 * @precondition The `cross-env` package is installed
 */
export function checkRuntimeEnv(runtimeEnv: unknown): runtimeEnv is RuntimeEnv {
  try {
    return process.env.NODE_ENV === runtimeEnv
  } catch {
    return false
  }
}

/**
 * Determine whether the current runtime is development
 *
 * @category Runtime
 */
export const isDevRuntime =
  checkRuntimeEnv('dev') || checkRuntimeEnv('development')

/**
 * Determine whether the current runtime is test
 *
 * @category Runtime
 */
export const isTestRuntime = checkRuntimeEnv('test')

/**
 * Determine whether the current runtime is production
 *
 * @category Runtime
 */
export const isProdRuntime =
  checkRuntimeEnv('prod') || checkRuntimeEnv('production')
