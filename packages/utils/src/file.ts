/**
 * Get file info via `mime` package
 * @category file
 */
export class FileInfo {
  mime: any

  constructor(theMimePackageInstance: any) {
    this.mime = theMimePackageInstance
  }

  getMimeType(path: string) {
    try {
      if (path.startsWith('data') && path.includes('base64')) {
        return path.split(',')[0].replace(/data:(.*);base64/, '$1')
      }
      return this.mime.getType(path) || ''
    } catch (e) {
      return ''
    }
  }

  getExtensionFromMimeType(mimeType: string) {
    try {
      return this.mime.getExtension(mimeType) || ''
    } catch (e) {
      return ''
    }
  }

  getExtension(path: string) {
    try {
      const mimeType = this.getMimeType(path)
      return this.getExtensionFromMimeType(mimeType)
    } catch (e) {
      return ''
    }
  }
}
