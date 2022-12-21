/**
 * The actual type of the data
 */
export type DataType =
  | 'boolean'
  | 'string'
  | 'number'
  | 'bigint'
  | 'symbol'
  | 'null'
  | 'undefined'
  | 'function'
  | 'object'
  | 'array'
  | 'date'
  | 'error'
  | 'set'
  | 'map'
  | 'weakSet'
  | 'weakMap'
  | 'file'
  | 'blob'
  | 'arraybuffer'
  | 'regexp'

/**
 * Get the real data type
 */
export function getDataType(target: any) {
  return Object.prototype.toString
    .call(target)
    .slice(8, -1)
    .toLowerCase() as DataType
}

/**
 * Determine whether the data is an object
 */
export function isObject(target: any) {
  return getDataType(target) === 'object'
}

/**
 * Determine whether the specified key exists on the object
 */
export function hasKey(obj: Record<string, any>, key: string) {
  if (!isObject(obj)) return false
  return Object.prototype.hasOwnProperty.call(obj, key)
}
