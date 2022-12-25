import mime from '@withtypes/mime'

/**
 * @category file
 */
export function getMimeType(path: string) {
  if (path.startsWith('data') && path.includes('base64')) {
    return path.split(',')[0].replace(/data:(.*);base64/, '$1')
  }
  return mime.getType(path) || ''
}

/**
 * @category file
 */
export function getExtensionFromMimeType(mimeType: string) {
  return mime.getExtension(mimeType) || ''
}

/**
 * @category file
 */
export function getExtension(path: string) {
  const mimeType = getMimeType(path)
  return getExtensionFromMimeType(mimeType)
}
