import { isBrowser } from '../device'
import { fallbackReadText, fallbackWriteText } from './fallback'

/**
 * @category interactive
 */
export type WritableElement = HTMLInputElement | HTMLTextAreaElement

/**
 * @category interactive
 */
export type CopyableElement = HTMLElement | WritableElement

/**
 * Extensions based on the Clipboard API and with fallback mechanism
 *
 * @category interactive
 */
export class ClipboardInstance {
  /**
   * Determine whether the clipboard is supported
   */
  isSupported: boolean

  constructor() {
    this.isSupported = !isBrowser
      ? false
      : !!navigator.clipboard || !!document.execCommand
  }

  /**
   * Copy the text passed in or the text of the specified DOM element
   *
   * @example
   *
   * ```
   * clipboard.copy(document.querySelector('.foo'))
   * ```
   */
  async copy(el: CopyableElement) {
    if (!this.isSupported) return false
    const clipText = el.innerText || (el as WritableElement).value
    return await this.write(clipText)
  }

  /**
   * Cut the text passed in or the text of the specified DOM element
   *
   * @example
   *
   * ```
   * clipboard.cut(document.querySelector('.foo'))
   * ```
   */
  async cut(el: WritableElement) {
    if (!this.isSupported) return false
    const isOk = await this.copy(el)
    if (!isOk) return false
    el.value = ''
    return true
  }

  /**
   * Read the text content of the clipboard
   */
  async read() {
    if (!this.isSupported) return ''
    try {
      return await navigator!.clipboard.readText()
    } catch (e) {
      return fallbackReadText()
    }
  }

  /**
   * Write text content to clipboard
   */
  async write(text: string) {
    if (!this.isSupported) return false
    try {
      await navigator!.clipboard.writeText(text)
      return true
    } catch (e) {
      return fallbackWriteText(text)
    }
  }
}

/**
 * Initialized Clipboard Instance
 *
 * @category interactive
 */
export const clipboard = new ClipboardInstance()
