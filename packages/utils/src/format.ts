import { hasKey, isObject } from './data'

/**
 * Extract numbers from text
 *
 * @param text - Text to be processed
 *
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
 *
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
 *
 * @param word - The sentence to be processed
 *
 * @param limit - The upper limit
 *
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
  return first.toUpperCase() + rest.join('')
}

/**
 * Formatted in `kebab-case` style
 *
 * @category format
 */
export function kebabCase(word: string) {
  if (!word) return ''
  return word
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split(' ')
    .join('-')
    .replace(/_/g, '-')
    .toLowerCase()
}

/**
 * Formatted in `camelCase` style
 *
 * @category format
 */
export function camelCase([first, ...rest]: string) {
  if (!first) return ''
  const word = first.toLowerCase() + rest.join('')
  return word.replace(/[-_](\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 * Formatted in `PascalCase` style
 *
 * @category format
 */
export function pascalCase(word: string) {
  if (!word) return ''
  return capitalize(camelCase(word))
}

/**
 * Escaping special characters for regular expressions
 *
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

/**
 * @category format
 */
interface UniqueOptions<T> {
  /**
   * The key used to determine if there are duplicate values
   */
  primaryKey: keyof T

  /**
   * he original data list
   */
  list: T[]
}

/**
 * Deduplicate an array containing objects
 *
 * @category format
 */
export function unique<T>({ primaryKey, list }: UniqueOptions<T>): T[] {
  // Use the value as the key and store it in the dictionary
  const dict: Map<any, T> = new Map()
  list.forEach((obj) => {
    const value = String(obj[primaryKey])
    if (dict.has(value)) return
    dict.set(value, obj)
  })

  // Return from dictionary to array
  const uniqueList: T[] = []
  dict.forEach((value) => {
    uniqueList.push(value)
  })

  return uniqueList
}

/**
 * Exclude specified fields from the object
 *
 * @tips Only handle first-level fields
 *
 * @param object - An object as data source
 *
 * @param fields - Field names to exclude
 *
 * @returns A processed new object
 *
 * @category format
 */
export function excludeFields(object: Record<string, any>, fields: string[]) {
  if (!isObject) return object

  const newObject: Record<string, any> = {}
  for (const key in object) {
    if (hasKey(object, key) && !fields.includes(key)) {
      newObject[key] = object[key]
    }
  }
  return newObject
}

/**
 * Format the time as `yyyy-MM-dd HH:mm:ss`
 *
 * @description Note:
 *  If the date separator is `-`, it will be parsed as
 *  a standard ISO 8601 formatted date string (e.g. 2023-01-01)
 *
 *  If the date separator is `/`, it will be parsed according to
 *  the non-standard date string format (e.g. 2023/01/01 )
 *
 *  This will result in inconsistent processing, please be aware of such cases.
 *  e.g. `+new Date('2023/01/01') !== +new Date('2023-01-01')`
 *
 * @param time - A timestamp or a date object
 *
 * @param dateOnly - If `true` , only returns `yyyy-MM-dd`
 *
 * @category format
 */
export function formatTime(time: number | Date, dateOnly?: boolean) {
  const date = new Date(time)

  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const seconds = ('0' + date.getSeconds()).slice(-2)

  const formattedDate = dateOnly
    ? `${year}-${month}-${day}`
    : `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  return formattedDate
}

/**
 * @category format
 */
interface FormatDurationUnit {
  days: string
  hours: string
  minutes: string
  seconds: string
}

/**
 * Generally used to format the display of two time gaps, such as countdown
 *
 * @param timestamp - Timestamp with two time gaps
 *
 * @param units - Time units,
 *                different languages can be passed in when i18n is needed,
 *                the default is Simplified Chinese
 *
 * @category format
 */
export function formatDuration(
  timestamp: number,
  units: FormatDurationUnit = {
    days: '天',
    hours: '小时',
    minutes: '分钟',
    seconds: '秒',
  },
) {
  // Convert timestamp to seconds
  const totalSeconds = Math.floor(timestamp / 1000)

  const days = Math.floor(totalSeconds / (3600 * 24))
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)

  // Build a formatted string
  const parts: string[] = []
  if (days > 0) {
    parts.push(`${days} ${units.days}`)
  }
  if (hours > 0) {
    parts.push(`${hours} ${units.hours}`)
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${units.minutes}`)
  }
  if (seconds > 0) {
    parts.push(`${seconds} ${units.seconds}`)
  }

  // Return the formatted result
  return parts.length === 0 ? `0 ${units.seconds}` : parts.join(' ')
}
