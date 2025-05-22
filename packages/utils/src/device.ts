import { getUserAgent } from './ua'

/**
 * Checks if the code is being executed in a browser environment
 *
 * @category Device
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * Checks if the code is being executed in a server environment
 *
 * @category Device
 */
export const isServer = !isBrowser

/**
 * Regular expression pattern to match mobile device user agents
 *
 * @category Device
 */
export const mobileDevicesRegExp = /iPhone|phone|android|iPod|pad|iPad/i

/**
 * Checks if the code is being executed on a mobile device
 *
 * @category Device
 */
export function isMobile() {
  if (!isBrowser) return false
  return mobileDevicesRegExp.test(getUserAgent())
}

/**
 * Regular expression pattern to match tablet device user agents
 *
 * @category Device
 */
export const tabletDevicesRegExp =
  /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/i

/**
 * Checks if the code is being executed on a tablet device
 *
 * @category Device
 */
export function isTablet() {
  if (!isBrowser) return false
  if (!isMobile()) return false
  return tabletDevicesRegExp.test(getUserAgent())
}

/**
 * Checks if the code is being executed on a desktop device
 *
 * @category Device
 */
export function isDesktop() {
  if (!isBrowser) return false
  return !isMobile()
}

/**
 * Regular expression pattern to match apple device user agents
 *
 * @category Device
 */
export const appleDevicesRegExp = /(mac|iphone|ipod|ipad)/i

/**
 * Checks if the code is being executed on an apple device
 *
 * @category Device
 */
export function isAppleDevice() {
  if (!isBrowser) return false
  return appleDevicesRegExp.test(getUserAgent())
}

/**
 * Checks if the code is running on an Android device
 *
 * @category Device
 */
export const isAndroid = /Android/i.test(getUserAgent())

/**
 * Checks if the code is running on an iOS device
 *
 * @category Device
 */
export const isIOS = /iPhone|iPod|iPad|iOS/i.test(getUserAgent())

/**
 * Checks if the code is running in a Uni-App environment
 *
 * @category Device
 */
export const isUniApp = /uni-app|html5plus/.test(getUserAgent())

/**
 * Checks if the code is running in a WeChat (Weixin) environment
 *
 * @category Device
 */
export const isWeixin = /MicroMessenger/i.test(getUserAgent())

/**
 * Checks if the code is running in a QQ environment
 *
 * @category Device
 */
export const isQQ = /\sQQ|mqqbrowser|qzone|qqbrowser/i.test(getUserAgent())

/**
 * Checks if the code is running in a QQ Browser environment
 *
 * @category Device
 */
export const isQQBrowser = /mqqbrowser|qqbrowser/i.test(getUserAgent())

/**
 * Checks if the code is running in a Qzone environment
 *
 * @category Device
 */
export const isQzone = /qzone\/.*_qz_([\d.]+)/i.test(getUserAgent())

/**
 * Checks if the code is running in a Weibo environment
 *
 * @category Device
 */
export const isWeibo = /(weibo).*weibo__([\d.]+)/i.test(getUserAgent())

/**
 * Checks if the code is running in a Baidu Box App environment
 *
 * @category Device
 */
export const isBaidu = /(baiduboxapp)\/([\d.]+)/i.test(getUserAgent())

/** @category Device */
interface DeviceResizeWatcherOptions {
  // Executed when the page load done
  immediate: boolean
}

/**
 * Watches for page resize or orientation change events and executes the
 * callback
 *
 * @category Device
 * @param callback - The callback function to be executed
 * @param options - The options for the resize watcher `immediate`: Determines
 *   whether the callback should be immediately executed on page load
 */
export function watchResize(
  callback: () => void,
  { immediate }: DeviceResizeWatcherOptions = { immediate: true },
) {
  if (!isBrowser) return
  if (immediate) {
    window.addEventListener('load', callback, false)
  }
  window.addEventListener(
    'orientationchange' in window ? 'orientationchange' : 'resize',
    callback,
    false,
  )
}
