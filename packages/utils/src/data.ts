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
 * @description Solve the judgment error of the value wrapped in an Object
 *  e.g. Object(1n), Object(1)
 *
 * @category data
 */
export function getDataType(target: any) {
  return Object.prototype.toString.call(target).slice(8, -1) as DataType
}

/**
 * Wrapper for `Array.isArray`, determine whether the data is Array
 *
 * @category data
 */
export function isArray(value: unknown): value is any[] {
  return Array.isArray(value)
}

/**
 * Determine whether the data is ArrayBuffer
 *
 * @category data
 */
export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return getDataType(value) === 'ArrayBuffer'
}

/**
 * Determine whether the data is AsyncFunction
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
 * Determine whether the data is BigInt
 *
 * @category data
 */
export function isBigInt(value: unknown): value is bigint {
  return getDataType(value) === 'BigInt'
}

/**
 * Determine whether the data is Blob
 *
 * @category data
 */
export function isBlob(value: unknown): value is Blob {
  return getDataType(value) === 'Blob'
}

/**
 * Determine whether the data is Boolean
 *
 * @category data
 */
export function isBoolean(value: unknown): value is boolean {
  return getDataType(value) === 'Boolean'
}

/**
 * Determine whether the data is Date
 *
 * @category data
 */
export function isDate(value: unknown): value is Date {
  return getDataType(value) === 'Date'
}

/**
 * Determine whether the data is Error
 *
 * @category data
 */
export function isError(value: unknown): value is Error {
  return getDataType(value) === 'Error'
}

/**
 * Determine whether the data is Even
 *
 * @category data
 */
export function isEven(value: unknown): value is number {
  if (!isInteger(value)) return false
  return value % 2 === 0
}

/**
 * Determine whether the data is File
 *
 * @category data
 */
export function isFile(value: unknown): value is File {
  return getDataType(value) === 'File'
}

/**
 * Wrapper for `Number.isFinite`, determine whether the data is finite

* @category data
 */
export function isFinite(value: unknown): value is number {
  return Number.isFinite(value)
}

/**
 * Determine whether the data is Function
 *
 * @category data
 */
export function isFunction(value: unknown): value is (...args: any) => any {
  return typeof value === 'function'
}

/**
 * Wrapper for `Number.isInteger`, determine whether the data is Integer

* @category data
 */
export function isInteger(value: unknown): value is number {
  return Number.isInteger(value)
}

/**
 * Determine whether the data is Map
 *
 * @category data
 */
export function isMap(value: unknown): value is Map<any, any> {
  return getDataType(value) === 'Map'
}

/**
 * Determine whether the data is Math
 *
 * @category data
 */
export function isMath(value: unknown): value is Math {
  return getDataType(value) === 'Math'
}

/**
 * Wrapper for `Number.isNaN`, determine whether the data is NaN

* @category data
 */
export function isNaN(value: unknown): value is number {
  return Number.isNaN(value)
}

/**
 * Determine whether the data is Null
 *
 * @category data
 */
export function isNull(value: unknown): value is null {
  return getDataType(value) === 'Null'
}

/**
 * Determine whether the data is Number
 *
 * @category data
 */
export function isNumber(value: unknown): value is number {
  return getDataType(value) === 'Number'
}

/**
 * Determine whether the data is Odd
 *
 * @category data
 */
export function isOdd(value: unknown): value is number {
  if (!isInteger(value)) return false
  return value % 2 !== 0
}

/**
 * Determine whether the data is Object
 *
 * @category data
 */
export function isObject(value: unknown): value is Record<any, any> {
  return getDataType(value) === 'Object'
}

/**
 * Determine whether the data is Promise
 *
 * @category data
 */
export function isPromise(value: unknown): value is Promise<any> {
  return getDataType(value) === 'Promise'
}

/**
 * Wrapper for `Number.isSafeInteger`, determine whether the data is Safe Integer

* @category data
 */
export function isSafeInteger(value: unknown): value is number {
  return Number.isSafeInteger(value)
}

/**
 * Determine whether the data is Promise
 *
 * @category data
 */
export function isSet(value: unknown): value is Set<any> {
  return getDataType(value) === 'Set'
}

/**
 * Determine whether the data is String
 *
 * @category data
 */
export function isString(value: unknown): value is string {
  return getDataType(value) === 'String'
}

/**
 * Determine whether the data is Symbol
 *
 * @category data
 */
export function isSymbol(value: unknown): value is symbol {
  return getDataType(value) === 'Symbol'
}

/**
 * Determine whether the data is Undefined
 *
 * @category data
 */
export function isUndefined(value: unknown): value is undefined {
  return getDataType(value) === 'Undefined'
}

/**
 * Determine whether the data is WeakMap
 *
 * @category data
 */
export function isWeakMap(value: unknown): value is WeakMap<any, any> {
  return getDataType(value) === 'WeakMap'
}

/**
 * Determine whether the data is WeakSet
 *
 * @category data
 */
export function isWeakSet(value: unknown): value is WeakSet<any> {
  return getDataType(value) === 'WeakSet'
}

/**
 * Determine whether the data is RegExp
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
