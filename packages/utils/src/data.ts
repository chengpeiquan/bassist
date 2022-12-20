/**
 * The actual type of the data
 */
export type DataType =
  | 'Boolean'
  | 'String'
  | 'Number'
  | 'BigInt'
  | 'Symbol'
  | 'Null'
  | 'Undefined'
  | 'Function'
  | 'Object'
  | 'Array'
  | 'Date'
  | 'Error'
  | 'Set'
  | 'Map'
  | 'WeakSet'
  | 'WeakMap'
  | 'File'
  | 'Blob'
  | 'ArrayBuffer'

/**
 * Get the real data type
 */
export function getDataType(target: any) {
  return Object.prototype.toString.call(target).slice(8, -1) as DataType
}

/**
 * Determine whether the data is an object
 */
export function isObject(target: any) {
  return getDataType(target) === 'Object'
}

/**
 * Determine whether the specified key exists on the object
 */
export function hasKey(obj: Record<string, any>, key: string) {
  if (!isObject(obj)) return false
  return Object.prototype.hasOwnProperty.call(obj, key)
}
