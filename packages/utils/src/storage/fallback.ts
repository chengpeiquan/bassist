import { hasKey } from '../data'

// A record to store instances of FallbackStorage based on their prefix
const fallbackStorageRecord: Record<string, FallbackStorage> = {}

/**
 * FallbackStorage class provides a fallback storage implementation when running outside the browser environment
 *
 * @category storage
 */
export class FallbackStorage {
  private data: Record<string, string>

  /**
   * Creates an instance of FallbackStorage.
   *
   * @param prefix - The prefix to be added to the storage keys.
   */
  constructor(prefix: string) {
    this.data = {}

    const hasRecord = hasKey(fallbackStorageRecord, prefix)

    // If a record with the same prefix exists, use its data
    // Otherwise, store the current instance in the record
    this.data = hasRecord ? fallbackStorageRecord[prefix].data : {}

    if (!hasRecord) {
      fallbackStorageRecord[prefix] = this
    }
  }

  /**
   * Gets the number of stored items
   */
  get length() {
    return Object.keys(this.data).length
  }

  /**
   * Clears all stored items.
   */
  clear() {
    this.data = {}
  }

  /**
   * Retrieves the value associated with the specified key
   */
  getItem(key: string) {
    if (hasKey(this.data, key)) {
      return this.data[key]
    }
    return null
  }

  /**
   * Sets the value for the specified key.
   */
  setItem(key: string, value: string) {
    this.data[key] = value
  }

  /**
   * Removes the item associated with the specified key.
   */
  removeItem(key: string) {
    if (hasKey(this.data, key)) {
      delete this.data[key]
    }
  }

  /**
   * Retrieves the key at the specified index.
   */
  key(index: number) {
    const keys = Object.keys(this.data)
    if (index > keys.length) return null
    return keys[index]
  }
}
