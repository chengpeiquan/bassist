import { type defineConfig, type Options } from 'tsup'

/**
 * Bundler format based on tsup
 *
 * @category Tsup
 * @see https://tsup.egoist.dev/#bundle-formats
 */
export enum BundleFormat {
  CJS = 'cjs',
  ESM = 'esm',
  IIFE = 'iife',
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
export const bundleBannerFields = [
  'name',
  'version',
  'description',
  'author',
  'homepage',
  'license',
] as const

/**
 * @category Tsup
 */
export interface GetBundleBannerOptions {
  /**
   * Generates a shebang that lets the script be executed using the Node.js
   * interpreter
   */
  bin?: boolean

  /**
   * Fields that need to be generated to Banner
   *
   * @default bundleBannerFields
   * @note Please make sure the value is a string
   */
  fields?: string[]
}

/**
 * Generate Banner content based on package.json
 *
 * @category Tsup
 * @param pkg - Contents of package.json
 * @param options - Options for adjusting output results
 * @returns Banner content for generated chunks
 * @see https://www.npmjs.com/package/vite-plugin-banner
 */
export const getBundleBanner = (
  pkg: Record<string, unknown>,
  { bin, fields: _fields }: GetBundleBannerOptions = {},
) => {
  if (Object.prototype.toString.call(pkg) !== '[object Object]') return ''

  const fields = Array.isArray(_fields)
    ? _fields
    : (bundleBannerFields as unknown as string[])

  const baseBanners: string[] = []
  baseBanners.push(`/**`)

  fields.forEach((k) => {
    const v = pkg[k]
    if (typeof v !== 'string') return
    const prefix = k === 'version' ? 'v' : ''
    baseBanners.push(` * ${k}: ${prefix}${v}`)
  })

  baseBanners.push(` */`)

  const banners = bin
    ? ['#!/usr/bin/env node', '', ...baseBanners]
    : baseBanners

  return banners.join('\n')
}

/**
 * @category Tsup
 */
export type Config = ReturnType<typeof defineConfig>

/**
 * @category Tsup
 */
export interface CreateBaseConfigOptions
  extends Partial<Pick<Options, 'entry' | 'globalName' | 'outDir' | 'format'>> {
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
