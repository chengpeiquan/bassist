import { isBrowser } from './device'

/**
 * @category appearance
 */
export type PrefersColorScheme = 'light' | 'dark'

/**
 * @category appearance
 */
export function checkIsDark() {
  if (!isBrowser) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * @category appearance
 */
export const isDark = checkIsDark()

/**
 * @category appearance
 */
export const isLight = !checkIsDark()

/**
 * @category appearance
 */
export function getPrefersColorScheme(): PrefersColorScheme {
  return checkIsDark() ? 'dark' : 'light'
}
