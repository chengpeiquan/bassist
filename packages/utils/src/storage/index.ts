import { BaseStorage } from './base'

/**
 * localStorage that supports prefixes
 *
 * @category storage
 */
export class LocalStorage extends BaseStorage {
  constructor(prefix: string) {
    super(prefix, 'localStorage')
  }
}

/**
 * sessionStorage that supports prefixes
 *
 * @category storage
 */
export class SessionStorage extends BaseStorage {
  constructor(prefix: string) {
    super(prefix, 'sessionStorage')
  }
}
