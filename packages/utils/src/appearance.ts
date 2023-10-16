import { isBrowser } from './device'

/**
 * The preferred color scheme for the appearance of the user interface
 *
 * @category appearance
 */
export type PrefersColorScheme = 'light' | 'dark'

/**
 * Dark mode media query
 *
 * @category appearance
 */
export const darkMediaQuery = isBrowser
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : undefined

/**
 * Checks if the user's preferred color scheme is dark
 *
 * @category appearance
 */
export function isDark() {
  if (!isBrowser) return false
  return darkMediaQuery!.matches
}

/**
 * Light mode media query
 *
 * @category appearance
 */
export const lightMediaQuery = isBrowser
  ? window.matchMedia('(prefers-color-scheme: light)')
  : undefined

/**
 * Checks if the user's preferred color scheme is light
 *
 * @category appearance
 */
export function isLight() {
  if (!isBrowser) return false
  return lightMediaQuery!.matches
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

/**
 * Portrait orientation media query
 *
 * @category appearance
 */
export const portraitMediaQuery = isBrowser
  ? window.matchMedia('(orientation: portrait)')
  : undefined

/**
 * Checks if the user's preferred color scheme is light
 *
 * @category appearance
 */
export function isPortrait() {
  if (!isBrowser) return false
  return portraitMediaQuery!.matches
}

/**
 * Landscape orientation media query
 *
 * @category appearance
 */
export const landscapeMediaQuery = isBrowser
  ? window.matchMedia('(orientation: landscape)')
  : undefined

export function isLandscape() {
  if (!isBrowser) return false
  return landscapeMediaQuery!.matches
}
