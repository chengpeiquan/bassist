import mime from '@withtypes/mime'

/**
 * @category file
 */
export function getMimeType(path: string) {
  try {
    if (path.startsWith('data') && path.includes('base64')) {
      return path.split(',')[0].replace(/data:(.*);base64/, '$1')
    }
    return mime.getType(path) || ''
  } catch (e) {
    return ''
  }
}

/**
 * @category file
 */
export function getExtensionFromMimeType(mimeType: string) {
  try {
    return mime.getExtension(mimeType) || ''
  } catch (e) {
    return ''
  }
}

/**
 * @category file
 */
export function getExtension(path: string) {
  try {
    const mimeType = getMimeType(path)
    return getExtensionFromMimeType(mimeType)
  } catch (e) {
    return ''
  }
}
