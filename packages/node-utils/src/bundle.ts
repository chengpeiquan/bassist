import { isArray, isObject, isString } from '@bassist/utils'

/**
 * Bundler format based on tsup
 *
 * @category Bundle
 * @see https://tsup.egoist.dev/#bundle-formats
 */
export enum BundleFormat {
  CJS = 'cjs',
  ESM = 'esm',
  IIFE = 'iife',
}

/**
 * Default bundler format config based on tsup
 *
 * @category Bundle
 * @see https://tsup.egoist.dev/#bundle-formats
 */
export const defaultBundleFormatConfig = [
  BundleFormat.CJS,
  BundleFormat.ESM,
  BundleFormat.IIFE,
]

/**
 * Provides the extension of the JavaScript file according to the bundle format
 *
 * @category Bundle
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

/** @category Bundle */
export const bundleBannerFields = [
  'name',
  'version',
  'description',
  'author',
  'homepage',
  'license',
] as const

/** @category Bundle */
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
 * @category Bundle
 * @param pkg - Contents of package.json
 * @param options - Options for adjusting output results
 * @returns Banner content for generated chunks
 * @see https://www.npmjs.com/package/vite-plugin-banner
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
