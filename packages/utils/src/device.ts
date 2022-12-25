import { getUserAgent } from './ua'

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
  return mobileDevicesRegExp.test(getUserAgent())
}

/**
 * @category device
 */
export const isMobile = checkIsMobile()

/**
 * @category device
 */
export const isDesktop = !checkIsMobile()

/**
 * @category device
 */
export const isAndroid = /Android/i.test(getUserAgent())

/**
 * @category device
 */
export const isIOS = /iPhone|iPod|iPad|iOS/i.test(getUserAgent())

/**
 * @category device
 */
export const isUniApp = /uni-app|html5plus/.test(getUserAgent())

/**
 * @category device
 */
export const isWeixin = /MicroMessenger/i.test(getUserAgent())

/**
 * @category device
 */
export const isQQ = /\sQQ|mqqbrowser|qzone|qqbrowser/i.test(getUserAgent())

/**
 * @category device
 */
export const isQQBrowser = /mqqbrowser|qqbrowser/i.test(getUserAgent())

/**
 * @category device
 */
export const isQzone = /qzone\/.*_qz_([\d.]+)/i.test(getUserAgent())

/**
 * @category device
 */
export const isWeibo = /(weibo).*weibo__([\d.]+)/i.test(getUserAgent())

/**
 * @category device
 */
export const isBaidu = /(baiduboxapp)\/([\d.]+)/i.test(getUserAgent())

/**
 * @category device
 */
interface DeviceResizeWatcherOptions {
  // Executed when the page load done
  immediate: boolean
}

/**
 * @category device
 */
export function watchResize(
  callback: () => void,
  { immediate }: DeviceResizeWatcherOptions = { immediate: true }
) {
  if (!isBrowser) return
  if (immediate) {
    window.addEventListener('load', callback, false)
  }
  window.addEventListener(
    'orientationchange' in window ? 'orientationchange' : 'resize',
    callback,
    false
  )
}
