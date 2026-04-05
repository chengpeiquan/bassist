/**
 * Shared bundler format constants.
 */
export const BundleFormat = {
  CJS: 'cjs',
  ESM: 'esm',
  IIFE: 'iife',
} as const

export type BundleFormatValue = (typeof BundleFormat)[keyof typeof BundleFormat]

/**
 * Shared banner fields.
 */
export const bundleBannerFields = [
  'name',
  'version',
  'description',
  'author',
  'homepage',
  'license',
] as const

export interface GetBundleBannerOptions {
  /**
   * Generates a shebang that lets the script be executed using the Node.js
   * interpreter.
   */
  bin?: boolean

  /**
   * Fields that need to be generated to banner.
   *
   * @default bundleBannerFields
   */
  fields?: string[]
}

/**
 * Generate banner content based on package.json.
 */
export const getBundleBanner = (
  pkg: Record<string, unknown>,
  { bin, fields: inputFields }: GetBundleBannerOptions = {},
) => {
  if (Object.prototype.toString.call(pkg) !== '[object Object]') return ''

  const fields = Array.isArray(inputFields)
    ? inputFields
    : (bundleBannerFields as unknown as string[])

  const baseBanners = ['/**']

  fields.forEach((key) => {
    const value = pkg[key]
    if (typeof value !== 'string') return
    const prefix = key === 'version' ? 'v' : ''
    baseBanners.push(` * ${key}: ${prefix}${value}`)
  })

  baseBanners.push(' */')

  return (bin ? ['#!/usr/bin/env node', '', ...baseBanners] : baseBanners).join(
    '\n',
  )
}

/**
 * Derive a stable global name for IIFE bundles from package name.
 */
export const getDefaultGlobalName = (pkgName: unknown) => {
  if (typeof pkgName !== 'string') return undefined

  const normalizedName = pkgName.replace(/^@/, '').replace(/\//g, '-')
  const segments = normalizedName
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))

  if (segments.length === 0) return undefined

  const [firstSegment, ...restSegments] = segments

  return [
    firstSegment[0].toLowerCase() + firstSegment.slice(1),
    ...restSegments,
  ].join('')
}
