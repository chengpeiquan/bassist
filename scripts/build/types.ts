export enum BundleFormat {
  CJS = 'cjs',
  ESM = 'esm',
  IIFE = 'iife',
}

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
   * Add `#!/usr/bin/env node` Shebang to first line
   *
   * @example See `./packages/commit`
   */
  bin?: boolean

  /**
   * By default, `index.ts` is used for the entry file.
   * In special cases, one or more entry files
   * can be specified to build sub-packages
   * or change the entry file name.
   */
  entryFile?: string
  entryFiles?: string[]

  /**
   * Specify which formats to output
   * By default, all formats are output
   */
  formats?: BundleFormat
}

export interface BuildOptions extends BuildConfig {
  name: string
}
