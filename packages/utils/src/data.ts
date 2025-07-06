/**
 * The actual type of the data
 *
 * @category Data
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
  | 'Math'
  | 'Null'
  | 'Number'
  | 'Object'
  | 'Promise'
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
 * Solve the judgment error of the value wrapped in an Object e.g. Object(1n),
 * Object(1)
 *
 * @category Data
 */
export function getDataType(target: any) {
  return Object.prototype.toString.call(target).slice(8, -1) as DataType
}

/**
 * Wrapper for `Array.isArray`, determine whether the data is Array
 *
 * @category Data
 */
export function isArray(value: unknown): value is any[] {
  return Array.isArray(value)
}

/**
 * Determine whether the data is ArrayBuffer
 *
 * @category Data
 */
export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return getDataType(value) === 'ArrayBuffer'
}

/**
 * Determine whether the data is AsyncFunction
 *
 * @category Data
 */
export function isAsyncFunction(
  value: unknown,
): value is (...args: any) => Promise<any> {
  if (!isFunction(value)) return false
  return getDataType(value) === 'AsyncFunction'
}

/**
 * Determine whether the data is BigInt
 *
 * @category Data
 */
export function isBigInt(value: unknown): value is bigint {
  return getDataType(value) === 'BigInt'
}

/**
 * Determine whether the data is Blob
 *
 * @category Data
 */
export function isBlob(value: unknown): value is Blob {
  return getDataType(value) === 'Blob'
}

/**
 * Determine whether the data is Boolean
 *
 * @category Data
 */
export function isBoolean(value: unknown): value is boolean {
  return getDataType(value) === 'Boolean'
}

/**
 * Determine whether the data is Date
 *
 * @category Data
 */
export function isDate(value: unknown): value is Date {
  return getDataType(value) === 'Date'
}

/**
 * Determine whether the data is Error
 *
 * @category Data
 */
export function isError(value: unknown): value is Error {
  return getDataType(value) === 'Error'
}

/**
 * Determine whether the data is Even
 *
 * @category Data
 */
export function isEven(value: unknown): value is number {
  if (!isInteger(value)) return false
  return value % 2 === 0
}

/**
 * Determine whether the data is File
 *
 * @category Data
 */
export function isFile(value: unknown): value is File {
  return getDataType(value) === 'File'
}

/**
 * Wrapper for `Number.isFinite`, determine whether the data is finite
 *
 * @category Data
 */
export function isFinite(value: unknown): value is number {
  return Number.isFinite(value)
}

/**
 * Determine whether the data is Function
 *
 * @category Data
 */
export function isFunction(value: unknown): value is (...args: any) => any {
  return typeof value === 'function'
}

/**
 * Wrapper for `Number.isInteger`, determine whether the data is Integer
 *
 * @category Data
 */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value)
}

/**
 * Determine whether the data is Map
 *
 * @category Data
 */
export function isMap(value: unknown): value is Map<any, any> {
  return getDataType(value) === 'Map'
}

/**
 * Determine whether the data is Math
 *
 * @category Data
 */
export function isMath(value: unknown): value is Math {
  return getDataType(value) === 'Math'
}

/**
 * Wrapper for `Number.isNaN`, determine whether the data is NaN
 *
 * @category Data
 */
export function isNaN(value: unknown): value is number {
  return Number.isNaN(value)
}

/**
 * Determine whether the data is Null
 *
 * @category Data
 */
export function isNull(value: unknown): value is null {
  return getDataType(value) === 'Null'
}

/**
 * Determine whether the data is Number
 *
 * @category Data
 */
export function isNumber(value: unknown): value is number {
  return getDataType(value) === 'Number'
}

/**
 * Determine whether the data is Odd
 *
 * @category Data
 */
export function isOdd(value: unknown): value is number {
  if (!isInteger(value)) return false
  return value % 2 !== 0
}

/**
 * Determine whether the data is Object
 *
 * @category Data
 */
export function isObject(value: unknown): value is Record<any, any> {
  return getDataType(value) === 'Object'
}

/**
 * Determine whether the data is Promise
 *
 * @category Data
 */
export function isPromise(value: unknown): value is Promise<any> {
  return getDataType(value) === 'Promise'
}

/**
 * Wrapper for `Number.isSafeInteger`, determine whether the data is Safe
 * Integer
 *
 * @category Data
 */
export function isSafeInteger(value: unknown): value is number {
  return Number.isSafeInteger(value)
}

/**
 * Determine whether the data is Promise
 *
 * @category Data
 */
export function isSet(value: unknown): value is Set<any> {
  return getDataType(value) === 'Set'
}

/**
 * Determine whether the data is String
 *
 * @category Data
 */
export function isString(value: unknown): value is string {
  return getDataType(value) === 'String'
}

/**
 * Determine whether the data is Symbol
 *
 * @category Data
 */
export function isSymbol(value: unknown): value is symbol {
  return getDataType(value) === 'Symbol'
}

/**
 * Determine whether the data is Undefined
 *
 * @category Data
 */
export function isUndefined(value: unknown): value is undefined {
  return getDataType(value) === 'Undefined'
}

/**
 * Determine whether the data is WeakMap
 *
 * @category Data
 */
export function isWeakMap(value: unknown): value is WeakMap<any, any> {
  return getDataType(value) === 'WeakMap'
}

/**
 * Determine whether the data is WeakSet
 *
 * @category Data
 */
export function isWeakSet(value: unknown): value is WeakSet<any> {
  return getDataType(value) === 'WeakSet'
}

/**
 * Determine whether the data is RegExp
 *
 * @category Data
 */
export function isRegExp(value: unknown): value is RegExp {
  return getDataType(value) === 'RegExp'
}

/**
 * Determine whether the specified key exists on the object
 *
 * @category Data
 */
export function hasKey<T, K extends keyof T>(obj: T, key: K): key is K {
  if (!isObject(obj)) return false
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export const hasOwnProperty = hasKey

/**
 * String to byte stream
 *
 * @category Data
 */
export function getBytes(value: string) {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(value)
  return bytes
}

/**
 * @category Data
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
 * @category Data
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
 * @category Data
 */
export type NoOperationFunction = (...args: any) => void

/**
 * A no operation function
 *
 * @category Data
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const noop: NoOperationFunction = (..._args) => void 0

/**
 * Promisify No operation function type
 *
 * @category Data
 */
export type PromisifyNoOperationFunction = (...args: any) => Promise<void>

/**
 * A promisify no operation function
 *
 * @category Data
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const pnoop: PromisifyNoOperationFunction = (..._args) =>
  new Promise<void>((r) => r())
