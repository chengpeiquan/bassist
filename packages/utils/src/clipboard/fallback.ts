import { isBrowser } from '../device'

export function fallbackWriteText(text: string) {
  if (!isBrowser) return false

  try {
    const textArea = document.createElement('textarea')
    textArea.value = text

    textArea.style.position = 'fixed'
    textArea.style.top = '-9999px'
    textArea.style.left = '-9999px'
    document.body.appendChild(textArea)

    textArea.focus()
    textArea.select()

    const successful = document.execCommand('copy')
    document.body.removeChild(textArea)
    return successful
  } catch (err) {
    return false
  }
}

export function fallbackReadText() {
  if (!isBrowser) return ''

  try {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)

    textarea.focus()
    document.execCommand('paste')

    const text = textarea.value
    textarea.remove()
    return text
  } catch (e) {
    return ''
  }
}
