import { hasKey } from '../data'

const fallbackStorageRecord: Record<string, FallbackStorage> = {}

export class FallbackStorage {
  private data: Record<string, string>

  constructor(prefix: string) {
    this.data = {}

    const hasRecord = hasKey(fallbackStorageRecord, prefix)
    this.data = hasRecord ? fallbackStorageRecord[prefix].data : {}

    if (!hasRecord) {
      fallbackStorageRecord[prefix] = this
    }
  }

  get length() {
    return Object.keys(this.data).length
  }

  clear() {
    this.data = {}
  }

  getItem(key: string) {
    if (hasKey(this.data, key)) {
      return this.data[key]
    }
    return null
  }

  setItem(key: string, value: string) {
    this.data[key] = value
  }

  removeItem(key: string) {
    if (hasKey(this.data, key)) {
      delete this.data[key]
    }
  }

  key(index: number) {
    const keys = Object.keys(this.data)
    if (index > keys.length) return null
    return keys[index]
  }
}
