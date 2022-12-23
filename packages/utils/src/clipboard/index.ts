import type { WritableElement, ClipboardInstance } from './types'

/**
 * Extensions based on the Clipboard API
 *
 * @category interactive
 */
export const clipboard: ClipboardInstance = {
  isSupported:
    typeof navigator === 'undefined' ? false : Boolean(navigator.clipboard),

  async copy(el) {
    if (!this.isSupported) return false
    const clipText = el.innerText || (el as WritableElement).value
    return await this.write(clipText)
  },

  async cut(el) {
    if (!this.isSupported) return false
    const isOk = await this.copy(el)
    if (!isOk) return false
    el.value = ''
    return true
  },

  async read() {
    if (!this.isSupported) return ''
    return await navigator!.clipboard.readText()
  },

  async write(text: string) {
    if (!this.isSupported) return false
    await navigator!.clipboard.writeText(text)
    return true
  },
}
