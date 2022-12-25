import { ua } from './ua'

/**
 * @category device
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * @category device
 */
export const isServer = !isBrowser

/**
 * @category device
 */
export const mobileDevicesRegExp = /iPhone|phone|android|iPod|pad|iPad/i

/**
 * @category device
 */
export function checkIsMobile() {
  return mobileDevicesRegExp.test(ua)
}

/**
 * @category device
 */
export const isMobile = checkIsMobile()

/**
 * @category device
 */
export const isDesktop = !mobileDevicesRegExp.test(ua)

/**
 * @category device
 */
export const isAndroid = /Android/i.test(ua)

/**
 * @category device
 */
export const isIOS = /iPhone|iPod|iPad|iOS/i.test(ua)

/**
 * @category device
 */
export const isUniApp = /uni-app|html5plus/.test(ua)

/**
 * @category device
 */
export const isWeixin = /MicroMessenger/i.test(ua)

/**
 * @category device
 */
export const isQQ = /\sQQ|mqqbrowser|qzone|qqbrowser/i.test(ua)

/**
 * @category device
 */
export const isQQBrowser = /mqqbrowser|qqbrowser/i.test(ua)

/**
 * @category device
 */
export const isQzone = /qzone\/.*_qz_([\d.]+)/i.test(ua)

/**
 * @category device
 */
export const isWeibo = /(weibo).*weibo__([\d.]+)/i.test(ua)

/**
 * @category device
 */
export const isBaidu = /(baiduboxapp)\/([\d.]+)/i.test(ua)

/**
 * @category device
 */
export function watchResize(callback: () => void) {
  if (!isBrowser) return
  window.addEventListener('load', callback, false)
  window.addEventListener(
    'orientationchange' in window ? 'orientationchange' : 'resize',
    callback,
    false
  )
}
