import {
  type OutExtensionContext,
  type OutExtensionObject,
  type UserConfig,
} from 'tsdown'
import {
  BundleFormat,
  bundleBannerFields,
  getBundleBanner,
  getDefaultGlobalName,
  type BundleFormatValue,
  type GetBundleBannerOptions,
} from './shared.ts'

export {
  BundleFormat,
  bundleBannerFields,
  getBundleBanner,
  getDefaultGlobalName,
  type BundleFormatValue,
  type GetBundleBannerOptions,
}

/**
 * Provides the extension of the JavaScript file according to the bundle format
 *
 * @category Tsdown
 * @see https://tsdown.dev/options/out-extensions
 */
export const getBundleExtension = ({
  format,
}: OutExtensionContext): OutExtensionObject => {
  switch (format) {
    case 'cjs': {
      return { js: '.cjs', dts: '.d.ts' }
    }
    case 'es': {
      return { js: '.mjs', dts: '.d.mts' }
    }
    default: {
      return { js: '.js' }
    }
  }
}

/**
 * @category Tsdown
 */
export type Config = UserConfig

/**
 * @category Tsdown
 */
export interface CreateBaseConfigOptions extends Partial<
  Pick<UserConfig, 'entry' | 'globalName' | 'outDir' | 'format'>
> {
  pkg: Record<string, unknown>
}

/**
 * Create base tsdown config
 *
 * @category Tsdown
 * @see https://tsdown.dev/guide/migrate-from-tsup
 */
export const createBaseConfig = (options: CreateBaseConfigOptions): Config => {
  const {
    pkg,
    entry = { index: 'src/index.ts' },
    globalName,
    outDir = 'dist',
    format = [BundleFormat.CJS, BundleFormat.ESM],
  } = options || {}

  const formats = Array.isArray(format) ? format : [format]
  const resolvedGlobalName =
    globalName ||
    (formats.includes(BundleFormat.IIFE)
      ? getDefaultGlobalName(pkg.name)
      : undefined)

  return {
    entry,
    target: ['es2020'],
    format,
    globalName: resolvedGlobalName,
    outExtensions: (ctx) => getBundleExtension(ctx),
    outDir,
    dts: true,
    banner: {
      js: getBundleBanner(pkg, { bin: !!pkg.bin }),
    },
    minify: true,
    clean: true,
  } satisfies Config
}
