/**
 * The actual type of the data
 *
 * @category data
 */
export type DataType =
  | 'Array'
  | 'ArrayBuffer'
  | 'AsyncFunction'
  | 'BigInt'
  | 'Blob'
  | 'Boolean'
  | 'Date'
  | 'Error'
  | 'File'
  | 'Function'
  | 'Map'
  | 'Null'
  | 'Number'
  | 'Object'
  | 'Set'
  | 'String'
  | 'Symbol'
  | 'RegExp'
  | 'Undefined'
  | 'WeakMap'
  | 'WeakSet'

/**
 * Get the real data type
 *
 * @description Solve the judgment error of the value wrapped in an Object
 *  e.g. Object(1n), Object(1)
 *
 * @category data
 */
export function getDataType(target: any) {
  return Object.prototype.toString.call(target).slice(8, -1) as DataType
}

/**
 * Determine whether the data is array
 *
 * @category data
 */
export function isArray(value: unknown): value is any[] {
  return getDataType(value) === 'Array'
}

/**
 * Determine whether the data is arraybuffer
 *
 * @category data
 */
export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return getDataType(value) === 'ArrayBuffer'
}

/**
 * Determine whether the data is async function
 *
 * @category data
 */
export function isAsyncFunction(
  value: unknown,
): value is (...args: any) => Promise<any> {
  if (!isFunction(value)) return false
  return getDataType(value) === 'AsyncFunction'
}

/**
 * Determine whether the data is bigint
 *
 * @category data
 */
export function isBigInt(value: unknown): value is bigint {
  return getDataType(value) === 'BigInt'
}

/**
 * Determine whether the data is blob
 *
 * @category data
 */
export function isBlob(value: unknown): value is Blob {
  return getDataType(value) === 'Blob'
}

/**
 * Determine whether the data is boolean
 *
 * @category data
 */
export function isBoolean(value: unknown): value is boolean {
  return getDataType(value) === 'Boolean'
}

/**
 * Determine whether the data is date
 *
 * @category data
 */
export function isDate(value: unknown): value is Date {
  return getDataType(value) === 'Date'
}

/**
 * Determine whether the data is error
 *
 * @category data
 */
export function isError(value: unknown): value is Error {
  return getDataType(value) === 'Error'
}

/**
 * Determine whether the data is file
 *
 * @category data
 */
export function isFile(value: unknown): value is File {
  return getDataType(value) === 'File'
}

/**
 * Determine whether the data is function
 *
 * @category data
 */
export function isFunction(value: unknown): value is (...args: any) => any {
  return typeof value === 'function'
}

/**
 * Determine whether the data is map
 *
 * @category data
 */
export function isMap(value: unknown): value is Map<any, any> {
  return getDataType(value) === 'Map'
}

/**
 * Determine whether the data is null
 *
 * @category data
 */
export function isNull(value: unknown): value is null {
  return getDataType(value) === 'Null'
}

/**
 * Determine whether the data is number
 *
 * @category data
 */
export function isNumber(value: unknown): value is number {
  return getDataType(value) === 'Number'
}

/**
 * Determine whether the data is object
 *
 * @category data
 */
export function isObject(value: unknown): value is Record<any, any> {
  return getDataType(value) === 'Object'
}

/**
 * Determine whether the data is set
 *
 * @category data
 */
export function isSet(value: unknown): value is Set<any> {
  return getDataType(value) === 'Set'
}

/**
 * Determine whether the data is string
 *
 * @category data
 */
export function isString(value: unknown): value is string {
  return getDataType(value) === 'String'
}

/**
 * Determine whether the data is symbol
 *
 * @category data
 */
export function isSymbol(value: unknown): value is symbol {
  return getDataType(value) === 'Symbol'
}

/**
 * Determine whether the data is undefined
 *
 * @category data
 */
export function isUndefined(value: unknown): value is undefined {
  return getDataType(value) === 'Undefined'
}

/**
 * Determine whether the data is weakmap
 *
 * @category data
 */
export function isWeakMap(value: unknown): value is WeakMap<any, any> {
  return getDataType(value) === 'WeakMap'
}

/**
 * Determine whether the data is weakset
 *
 * @category data
 */
export function isWeakSet(value: unknown): value is WeakSet<any> {
  return getDataType(value) === 'WeakSet'
}

/**
 * Determine whether the data is regexp
 *
 * @category data
 */
export function isRegExp(value: unknown): value is RegExp {
  return getDataType(value) === 'RegExp'
}

/**
 * Determine whether the specified key exists on the object
 *
 * @category data
 */
export function hasKey<T, K extends keyof T>(obj: T, key: K): key is K {
  if (!isObject(obj)) return false
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * String to byte stream
 *
 * @category data
 */
export function getBytes(value: string) {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(value)
  return bytes
}

/**
 * @category data
 */
export interface InRangeOptions {
  num: number
  min: number
  max: number
  includeMin?: boolean
  includeMax?: boolean
}

/**
 * Checks if a number is between minimum and maximum
 *
 * @category data
 */
export function inRange({
  num,
  min,
  max,
  includeMin = true,
  includeMax = true,
}: InRangeOptions) {
  if (!isNumber(num) || !isNumber(min) || !isNumber(max)) return false

  const isMin = includeMin
    ? num >= Math.min(min, max)
    : num > Math.min(min, max)

  const isMax = includeMax
    ? num <= Math.max(min, max)
    : num < Math.max(min, max)

  return isMin && isMax
}

/**
 * No operation function type
 *
 * @category data
 */
export type NoOperationFunction = (...args: any) => void

/**
 * A no operation function
 *
 * @category data
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const noop: NoOperationFunction = (..._args) => void 0

/**
 * Promisify No operation function type
 *
 * @category data
 */
export type PromisifyNoOperationFunction = (...args: any) => Promise<void>

/**
 * A promisify no operation function
 *
 * @category data
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const pnoop: PromisifyNoOperationFunction = (..._args) =>
  new Promise<void>((r) => r())
