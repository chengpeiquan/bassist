import { isObject, isString } from './data'
import { isBrowser } from './device'

/**
 * @category Query
 */
type QueryInfo = Record<string, string>

/**
 * @category Query
 */
type QueryInfoObject = Record<
  string,
  string | number | boolean | undefined | null
>

/**
 * Parse URL Query parameters
 *
 * @category Query
 * @param url - By default, it is extracted from the browser URL, and this
 *   parameter can be parsed from the specified URL
 * @returns Query parameter object, will convert `key1=value1&key2=value2` into
 *   an object
 */
export function parseQuery(url?: string) {
  let queryStringify = ''

  if (isBrowser) {
    const { search } = window.location
    queryStringify = search
  }

  if (isString(url) && url.startsWith('http')) {
    const index = url.indexOf('?')
    queryStringify = index === -1 ? '' : url.slice(index)
  }

  if (queryStringify.includes('#')) {
    const index = queryStringify.indexOf('#')
    queryStringify = queryStringify.slice(0, index)
  }

  if (!queryStringify.length) return {}

  const temp: QueryInfo = {}
  queryStringify
    .slice(1)
    .split('&')
    .forEach((str) => {
      const [k, v] = str.split('=')
      temp[k] = decodeURIComponent(v)
    })
  return temp
}

/**
 * Extract parameter information from URL Query
 *
 * @category Query
 * @returns An object containing the request path and parameters object `path`:
 *   Jump path, the same as the routing name in the Web App `params`: Parameters
 *   other than path
 */
export function extractQueryInfo(url?: string): {
  path: string
  params: QueryInfo
} {
  const query = parseQuery(url)
  const params: QueryInfo = {}
  Object.keys(query).forEach((k) => {
    if (k === 'path') return
    params[k] = query[k]
  })

  const path = query.path || ''
  return { path, params }
}

/**
 * Get the specified Query parameter
 *
 * @category Query
 * @param key - The parameter key name to get
 * @param url - By default, it is extracted from the browser URL, and this
 *   parameter can be parsed from the specified URL
 */
export function getQuery(key: string, url?: string) {
  const query = parseQuery(url)
  return query[key] || ''
}

/**
 * Serialize Query parameters information
 *
 * @category Query
 * @param queryInfoObject - The object of the Query parameter to use for
 *   serialization
 */
export function stringifyQuery(queryInfoObject: QueryInfoObject) {
  if (!isObject(queryInfoObject)) return ''
  return Object.keys(queryInfoObject)
    .map((key) => `${key}=${encodeURIComponent(String(queryInfoObject[key]))}`)
    .join('&')
}
