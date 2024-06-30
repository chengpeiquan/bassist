import { isArray, isObject, isString } from '@bassist/utils'

/**
 * Bundler format based on tsup
 *
 * @see https://tsup.egoist.dev/#bundle-formats
 *
 * @category bundle
 */
export enum BundleFormat {
  CJS = 'cjs',
  ESM = 'esm',
  IIFE = 'iife',
}

/**
 * Default bundler format config based on tsup
 *
 * @see https://tsup.egoist.dev/#bundle-formats
 *
 * @category bundle
 */
export const defaultBundleFormatConfig = [
  BundleFormat.CJS,
  BundleFormat.ESM,
  BundleFormat.IIFE,
]

/**
 * Provides the extension of the JavaScript file
 * according to the bundle format
 *
 * @see https://tsup.egoist.dev/#output-extension
 *
 * @category bundle
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
 * @category bundle
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
 * @category bundle
 */
export interface GetBundleBannerOptions {
  /**
   * Generates a shebang that lets the script
   * be executed using the Node.js interpreter
   */
  bin?: boolean

  /**
   * Fields that need to be generated to Banner
   *
   * @note Please make sure the value is a string
   *
   * @default bundleBannerFields
   */
  fields?: string[]
}

/**
 * Generate Banner content based on package.json
 *
 * @see https://www.npmjs.com/package/vite-plugin-banner
 *
 * @param pkg - Contents of package.json
 * @param options - Options for adjusting output results
 *
 * @returns Banner content for generated chunks
 *
 * @category bundle
 */
export const getBundleBanner = (
  pkg: Record<string, unknown>,
  { bin, fields: _fields }: GetBundleBannerOptions = {},
) => {
  if (!isObject(pkg)) return ''

  const fields = isArray(_fields)
    ? _fields
    : (bundleBannerFields as unknown as string[])

  const baseBanners: string[] = []
  baseBanners.push(`/**`)

  fields.forEach((k) => {
    const v = pkg[k]
    if (!isString(v)) return
    const prefix = k === 'version' ? 'v' : ''
    baseBanners.push(` * ${k}: ${prefix}${v}`)
  })

  baseBanners.push(` */`)

  const banners = bin
    ? ['#!/usr/bin/env node', '', ...baseBanners]
    : baseBanners

  return banners.join('\n')
}
