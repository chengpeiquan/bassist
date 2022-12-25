import { ua } from './ua'

/**
 * @category env
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * @category env
 */
export const isServer = !isBrowser

/**
 * @category env
 */
export const mobileDevicesRegExp = /iPhone|phone|android|iPod|pad|iPad/i

/**
 * @category env
 */
export const isMobile = mobileDevicesRegExp.test(ua)

/**
 * @category env
 */
export const isDesktop = !mobileDevicesRegExp.test(ua)

/**
 * @category env
 */
export const isAndroid = /Android/i.test(ua)

/**
 * @category env
 */
export const isIOS = /iPhone|iPod|iPad|iOS/i.test(ua)

/**
 * @category env
 */
export const isUniApp = /uni-app|html5plus/.test(ua)

/**
 * @category env
 */
export const isWeixin = /MicroMessenger/i.test(ua)

/**
 * @category env
 */
export const isQQ = /\sQQ|mqqbrowser|qzone|qqbrowser/i.test(ua)

/**
 * @category env
 */
export const isQQBrowser = /mqqbrowser|qqbrowser/i.test(ua)

/**
 * @category env
 */
export const isQzone = /qzone\/.*_qz_([\d.]+)/i.test(ua)

/**
 * @category env
 */
export const isWeibo = /(weibo).*weibo__([\d.]+)/i.test(ua)

/**
 * @category env
 */
export const isBaidu = /(baiduboxapp)\/([\d.]+)/i.test(ua)
