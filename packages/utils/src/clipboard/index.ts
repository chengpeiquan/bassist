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
    try {
      const clipText = el.innerText || (el as WritableElement).value
      return await this.write(clipText)
    } catch (e) {
      console.log(e)
      return false
    }
  },

  async cut(el): Promise<boolean> {
    try {
      // Copy first
      const isOk = await this.copy(el)
      if (!isOk) return false

      // Then clear existing content
      el.value = ''
      return true
    } catch (e) {
      console.log(e)
      return false
    }
  },

  async read() {
    try {
      return await navigator!.clipboard.readText()
    } catch (e) {
      return ''
    }
  },

  async write(text: string) {
    try {
      await navigator!.clipboard.writeText(text)
      return true
    } catch (e) {
      return false
    }
  },
}
