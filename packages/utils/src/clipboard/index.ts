import { isBrowser } from '../device'
import { fallbackReadText, fallbackWriteText } from './fallback'

/**
 * @category Interactive
 */
export type WritableElement = HTMLInputElement | HTMLTextAreaElement

/**
 * @category Interactive
 */
export type CopyableElement = HTMLElement | WritableElement

/**
 * Extensions based on the Clipboard API and with fallback mechanism
 *
 * @category Interactive
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
   *   ;```
   *   clipboard.copy(document.querySelector('.foo'))
   *   ```
   */
  async copy(el: CopyableElement) {
    if (!this.isSupported) return false
    const clipText = el.innerText || (el as WritableElement).value
    const isOk = await this.write(clipText)
    return isOk
  }

  /**
   * Cut the text passed in or the text of the specified DOM element
   *
   * @example
   *   ;```
   *   clipboard.cut(document.querySelector('.foo'))
   *   ```
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
    } catch {
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
    } catch {
      return fallbackWriteText(text)
    }
  }
}

/**
 * Initialized Clipboard Instance
 *
 * @category Interactive
 */
export const clipboard = new ClipboardInstance()
