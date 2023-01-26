import { isObject } from './data'

/**
 * Extract numbers from text
 * @param text - Text to be processed
 * @param startsWithZero - Preserve the 0-starting format like `002`
 *
 * @category format
 */
export function extractNumber(text: string | number, startsWithZero = false) {
  text = text ? String(text) : ''
  text = text.replace(/[^\d]/g, '')

  if (text && !startsWithZero) {
    text = parseInt(text)
  }

  return String(text)
}

/**
 * Format amount with two decimal places
 * @param amount - Amount to be processed
 *
 * @category format
 */
export function formatAmount(amount: string | number) {
  amount = String(amount)
  if (!amount) return '0.00'

  const arr = amount.split('.')
  const integer = arr[0]
  const decimal = arr[1]

  // no decimals
  if (arr.length === 1) {
    return `${integer}.00`
  }

  // 1 decimal place
  if (decimal.length === 1) {
    return `${amount}0`
  }

  // Uniform returns two decimal places
  return Number(amount).toFixed(2)
}

/**
 * Add ellipses to words that are out of length
 * @param word - The sentence to be processed
 * @param limit - The upper limit
 * @returns The processed word
 *
 * @category format
 */
export function ellipsis(word: string, limit: number): string {
  return String(word).length > limit
    ? String(word).slice(0, limit) + ' ...'
    : String(word)
}

/**
 * Capitalize the first letter
 *
 * @category format
 */
export function capitalize([first, ...rest]: string) {
  if (!first) return ''
  return first?.toUpperCase() + rest.join('').toLowerCase()
}

/**
 * Escaping special characters for regular expressions
 * @copyright lodash.escaperegexp
 *
 * @category format
 */
export function escapeRegExp(name: string) {
  const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
  const reHasRegExpChar = RegExp(reRegExpChar.source)
  return name && reHasRegExpChar.test(name)
    ? name.replace(reRegExpChar, '\\$&')
    : name
}

/**
 * Sort the keys of an object
 *
 * @category format
 */
export function sortKeys(target: any): any {
  if (!Array.isArray(target) && !isObject(target)) {
    return target
  }

  if (Array.isArray(target)) {
    return target.map((i) => sortKeys(i))
  }

  const keys = Object.keys(target).sort()
  const newObj: Record<string, any> = {}
  keys.forEach((k) => {
    newObj[k] = sortKeys(target[k])
  })
  return newObj
}
