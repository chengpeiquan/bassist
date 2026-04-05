import { type defineConfig, type Options } from 'tsup'
import {
  BundleFormat,
  bundleBannerFields,
  getBundleBanner,
  type GetBundleBannerOptions,
} from './shared'

export {
  BundleFormat,
  bundleBannerFields,
  getBundleBanner,
  type GetBundleBannerOptions,
}

/**
 * Provides the extension of the JavaScript file according to the bundle format
 *
 * @category Tsup
 * @see https://tsup.egoist.dev/#output-extension
 */
export const getBundleExtension = ({ format }: Record<string, unknown>) => {
  switch (format) {
    case BundleFormat.CJS: {
      return { js: `.cjs` }
    }
    case BundleFormat.ESM: {
      return { js: `.mjs` }
    }
    default: {
      return { js: `.js` }
    }
  }
}

/**
 * @category Tsup
 */
export type Config = ReturnType<typeof defineConfig>

/**
 * @category Tsup
 */
export interface CreateBaseConfigOptions extends Partial<
  Pick<Options, 'entry' | 'globalName' | 'outDir' | 'format'>
> {
  pkg: Record<string, unknown>
}

/**
 * Create base tsup config
 *
 * @category Tsup
 * @see https://tsup.egoist.dev/#bundle-formats
 */
export const createBaseConfig = (options: CreateBaseConfigOptions) => {
  const {
    pkg,
    entry = { index: 'src/index.ts' },
    globalName,
    outDir = 'dist',
    format = [BundleFormat.CJS, BundleFormat.ESM],
  } = options || {}

  return {
    entry,
    target: ['es2020'],
    format,
    globalName,
    outExtension: (ctx) => getBundleExtension(ctx),
    outDir,
    dts: true,
    banner: {
      js: getBundleBanner(pkg, { bin: !!pkg.bin }),
    },
    bundle: true,
    minify: true,
    clean: true,
  } as const satisfies Config
}
