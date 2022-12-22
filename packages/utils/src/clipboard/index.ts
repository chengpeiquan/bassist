import type { WritableElement, ClipboardInstance } from './types'

/**
 * Extensions based on the Clipboard API
 *
 * @category interactive
 */
export const clipboard: ClipboardInstance = {
  isSupported:
    typeof navigator === 'undefined' ? false : Boolean(navigator.clipboard),

  text: '',

  async copy(target) {
    try {
      if (typeof target === 'string') {
        await navigator!.clipboard.writeText(target)
        this.text = target
        return true
      }

      const clipText = target.innerText || (target as WritableElement).value
      await navigator!.clipboard.writeText(clipText)
      this.text = clipText
      return true
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
      this.text = text
      return true
    } catch (e) {
      return false
    }
  },
}
