import { isBrowser } from './device'

/**
 * @category appearance
 */
export type PrefersColorScheme = 'light' | 'dark'

/**
 * @category appearance
 */
export function isDark() {
  if (!isBrowser) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * @category appearance
 */
export function isLight() {
  if (!isBrowser) return false
  return window.matchMedia('(prefers-color-scheme: light)').matches
}

/**
 * @category appearance
 */
export function getPrefersColorScheme(): PrefersColorScheme | undefined {
  if (isDark()) return 'dark'
  if (isLight()) return 'light'
  return undefined
}
