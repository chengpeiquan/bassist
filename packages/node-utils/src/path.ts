import { dirname } from 'path'
import { fileURLToPath } from 'url'

/**
 * @param metaUrl - import.meta.url
 *
 * @category path
 */
export function getDirnameInEsModule(metaUrl: string) {
  try {
    const __filename = fileURLToPath(metaUrl)
    const __dirname = dirname(__filename)
    return __dirname
  } catch (e) {
    return ''
  }
}
