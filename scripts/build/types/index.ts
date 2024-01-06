import { Builder } from '../builders'

/**
 * Some special options for the build process
 *
 * @description Configuration file location:
 *   `./packages/${name}/.build/config.json`
 */
export interface BuildConfig {
  /**
   * There are currently two sets of construction processes
   * to temporarily solve unknown construction problems in business scenarios.
   *
   * @todo May unify into one set of tools and enable this option in the future
   *
   * @default Builder.Vite
   */
  builder?: Builder

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
}

export interface BuildOptions extends BuildConfig {
  name: string
}
