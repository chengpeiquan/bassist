import { isBrowser } from './device'

/**
 * @category appearance
 */
export type ColorScheme = 'light' | 'dark'

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
export function getColorScheme() {
  return checkIsDark() ? 'dark' : 'light'
}
