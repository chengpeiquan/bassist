/**
 * Some special options for the build process
 *
 * @description Configuration file location:
 *   `./packages/${name}/.build/config.json`
 */
export interface BuildConfig {
  /**
   * Skip the build process
   *
   * @example See `./packages/tsconfig`
   */
  skip?: boolean

  /**
   * CommonJS Externals
   *
   * @example See `./packages/node-utils`
   */
  externals?: string[]
}

export interface BuildOptions extends BuildConfig {
  name: string
}
