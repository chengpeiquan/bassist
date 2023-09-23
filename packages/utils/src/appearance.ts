import { isBrowser } from './device'

/**
 * The preferred color scheme for the appearance of the user interface
 *
 * @category appearance
 */
export type PrefersColorScheme = 'light' | 'dark'

/**
 * Checks if the user's preferred color scheme is dark
 *
 * @category appearance
 */
export function isDark() {
  if (!isBrowser) return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Checks if the user's preferred color scheme is light
 *
 * @category appearance
 */
export function isLight() {
  if (!isBrowser) return false
  return window.matchMedia('(prefers-color-scheme: light)').matches
}

/**
 * Retrieves the user's preferred color scheme
 *
 * @category appearance
 */
export function getPrefersColorScheme(): PrefersColorScheme | undefined {
  if (isDark()) return 'dark'
  if (isLight()) return 'light'
  return undefined
}
