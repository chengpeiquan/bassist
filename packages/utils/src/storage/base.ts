import { isBrowser } from '../env'
import { getDataType } from '../data'
import { FallbackStorage } from './fallback'

export type StorageType = 'localStorage' | 'sessionStorage'

export class BaseStorage {
  prefix: string
  private storage: Storage | FallbackStorage

  constructor(prefix: string, storageType: StorageType) {
    this.prefix = prefix
    this.storage = isBrowser ? window[storageType] : new FallbackStorage()
  }

  /**
   * Read stored data
   * @tips The `key` doesn't need to be prefixed
   * @returns The data in the format before storage
   */
  get(key: string) {
    if (!isBrowser) return

    const localData = this.storage.getItem(`${this.prefix}-${key}`)
    if (!localData) return localData

    try {
      if (localData === 'true') return true
      if (localData === 'false') return false
      if (localData === 'null') return null
      if (localData === 'undefined') return undefined
      return JSON.parse(localData)
    } catch (e) {
      return localData
    }
  }

  /**
   * Set storage data
   */
  set(key: string, value: any) {
    if (!isBrowser) return
    try {
      const isString = getDataType(value) === 'string'
      const data = isString ? value : JSON.stringify(value)
      this.storage.setItem(`${this.prefix}-${key}`, data)
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * Remove the specified storage data under the current prefix
   */
  remove(key: string) {
    if (!isBrowser) return
    this.storage.removeItem(`${this.prefix}-${key}`)
  }

  /**
   * Clear all stored data under the current prefix
   */
  clear() {
    if (!isBrowser) return
    const keys = this.list()
    keys.forEach((key) => {
      this.storage.removeItem(key)
    })
  }

  /**
   * Count the number of storage related to the current prefix
   */
  count() {
    return this.list().length
  }

  /**
   * List storage keys associated with the current prefix
   */
  list() {
    if (!isBrowser || !this.prefix) return []

    const result: string[] = []
    const count = this.storage.length
    for (let i = 0; i < count; i++) {
      const key = this.storage.key(i)
      if (key?.startsWith(this.prefix)) {
        result.push(key)
      }
    }
    return result
  }
}
