import { BaseStorage } from './base'

/**
 * LocalStorage that supports prefixes
 *
 * @category Storage
 */
export class LocalStorage extends BaseStorage {
  constructor(prefix: string) {
    super(prefix, 'localStorage')
  }
}

/**
 * SessionStorage that supports prefixes
 *
 * @category Storage
 */
export class SessionStorage extends BaseStorage {
  constructor(prefix: string) {
    super(prefix, 'sessionStorage')
  }
}
