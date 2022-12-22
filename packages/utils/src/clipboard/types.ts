/**
 * @category interactive
 */
export type WritableElement = HTMLInputElement | HTMLTextAreaElement

/**
 * @category interactive
 */
export type CopyableElement = HTMLElement | WritableElement

/**
 * @category interactive
 */
export interface ClipboardInstance {
  /**
   * Determine whether the clipboard is supported
   */
  isSupported: boolean

  /**
   * Copy the text passed in or the text of the specified DOM element
   *
   * @example
   *
   * ```
   * clipboard.copy(document.querySelector('.foo'))
   * ```
   */
  // eslint-disable-next-line no-unused-vars
  copy: (el: CopyableElement) => Promise<boolean>

  /**
   * Cut the text passed in or the text of the specified DOM element
   *
   * @example
   *
   * ```
   * clipboard.cut(document.querySelector('.foo'))
   * ```
   */
  // eslint-disable-next-line no-unused-vars
  cut: (el: WritableElement) => Promise<boolean>

  /**
   * Read the text content of the clipboard
   */
  read: () => Promise<string>

  /**
   * Write text content to clipboard
   */
  // eslint-disable-next-line no-unused-vars
  write: (text: string) => Promise<boolean>
}
