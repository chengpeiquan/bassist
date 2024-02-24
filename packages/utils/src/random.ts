import { desktopUserAgents, mobileUserAgents, userAgents } from './ua'

/**
 * Generate random number
 *
 * @param min - The minimum value in the range
 *
 * @param max - The maximum value in the range
 *
 * @param roundingType - Round the result
 *
 * @category random
 */
export function randomNumber(
  min = 0,
  max = 100,
  roundingType: 'round' | 'ceil' | 'floor' = 'round',
) {
  return Math[roundingType](Math.random() * (max - min) + min)
}

/**
 * Generate random string
 *
 * @param length - The length of the string to be returned
 *
 * @category random
 */
export function randomString(length = 10) {
  // https://github.com/ai/nanoid/blob/main/url-alphabet/index.js
  const dict =
    'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

  let str = ''
  let i = length
  const len = dict.length
  while (i--) str += dict[(Math.random() * len) | 0]
  return str
}

/**
 * Generate random boolean
 *
 * @category random
 */
export function randomBoolean() {
  const index = randomNumber(0, 1)
  return [true, false][index]
}

/**
 * Shuffle the array and sort it randomly
 *
 * @category random
 */
export function shuffle(arr: any[]): any[] {
  if (!Array.isArray(arr)) return arr

  for (let i = arr.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1))
    const item: any = arr[i]
    arr[i] = arr[j]
    arr[j] = item
  }

  return arr
}

/**
 * Randomly returns a mocked UA
 *
 * @param device - Get a random UA on the specified device type
 *
 * @category random
 */
export function randomUserAgent(device?: 'desktop' | 'mobile') {
  const uaList =
    device === 'desktop'
      ? desktopUserAgents
      : device === 'mobile'
        ? mobileUserAgents
        : userAgents

  const index = randomNumber(0, uaList.length - 1)
  return uaList[index]
}
