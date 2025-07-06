import { pnoop } from './data'
import { isBrowser } from './device'
import { getQuery } from './query'
import { randomString } from './random'

/**
 * @category Network
 */
export type ResourcesSupportedWithLoadRes = 'js' | 'css' | 'style'

type ResourcesElement = HTMLScriptElement | HTMLLinkElement | HTMLStyleElement

/**
 * @category Network
 */
export interface LoadResOptions {
  type: ResourcesSupportedWithLoadRes
  id: string
  resource: string
}

/**
 * Dynamic loading of resources
 *
 * @category Network
 */
export function loadRes({ type, id, resource }: LoadResOptions) {
  return new Promise((resolve, reject) => {
    if (!isBrowser || document.querySelector(`#${id}`)) {
      reject()
      return
    }

    function bindStatus(el: ResourcesElement) {
      el.addEventListener('load', resolve)
      el.addEventListener('error', reject)
      el.addEventListener('abort', reject)
    }

    switch (type) {
      case 'js': {
        const script = document.createElement('script')
        script.id = id
        script.async = true
        script.src = resource
        bindStatus(script)
        document.head.appendChild(script)
        break
      }

      case 'css': {
        const link = document.createElement('link')
        link.id = id
        link.rel = 'stylesheet'
        link.href = resource
        bindStatus(link)
        document.head.appendChild(link)
        break
      }

      case 'style': {
        const style = document.createElement('style')
        style.id = id
        bindStatus(style)
        document.head.appendChild(style)
        style.appendChild(document.createTextNode(resource))
        break
      }
    }
  })
}

/**
 * JSON with Padding
 *
 * Note: JSONP is a method for sending JSON data without worrying about
 * cross-domain issues. JSONP does not use the XMLHttpRequest or Fetch, it uses
 * the `<script />` tag instead.
 *
 * @category Network
 * @example
 *   ```ts
 *   interface Res {
 *   code: number
 *   data: string[]
 *   msg: string
 *   }
 *
 *   // The default and server-side agreement is to use `callback` Query
 *   const url = `https://example.com/data`
 *
 *   // When no `callback` param passed, a random function name is created
 *   // Equivalent to `https://example.com/data?callback=randomCallbackName`
 *   // Pass the type of response as a generic to get a typed return value
 *   const res = await jsonp<Res>(url)
 *
 *   // You can also specify the `callback` function name
 *   const callback = 'jsonp_callback_123456'
 *   const res2 = await jsonp<Res>(url, callback)
 *
 *   // If the server does not agree on the `callback` Query,
 *   // you can specify other valid Query in this way.
 *   const urlWithCallback = `https://example.com/data?cb=${callback}`
 *   const res3 = await jsonp<Res>(urlWithCallback)
 *   ```
 *
 * @param url - The Resource script URL.
 * @param callback - The Callback function name, Optional, it will be an
 *   attribute name of `window`, so needs to be unique, If not passed, a random
 *   function name will be automatically generated.
 * @see https://en.wikipedia.org/wiki/JSONP
 */
export function jsonp<T>(url: string, callback?: string) {
  return new Promise<T>((resolve, reject) => {
    if (!isBrowser) {
      reject()
      return
    }

    const callbackByUrl = getQuery(url)
    const cb =
      callbackByUrl ||
      callback ||
      `jsonp_callback_${randomString().replace(/-/g, '_')}`

    // @ts-expect-error
    window[cb] = (data: T) => {
      try {
        // @ts-expect-error
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete window[cb]
      } catch {
        // @ts-expect-error
        window[cb] = undefined
      }
      document.body.removeChild(script)
      resolve(data)
    }

    const separator = url.includes('?') ? '&' : '?'
    const scriptUrl = url.includes('callback')
      ? url
      : url + separator + 'callback=' + cb

    const script = document.createElement('script')
    script.src = scriptUrl
    script.onerror = reject
    document.body.appendChild(script)
  })
}

/**
 * Load a batch of images in concurrent mode
 *
 * @category Network
 */
export function concurrentLoadImages(images: string[]) {
  const promises = []

  for (const path in images) {
    promises.push(
      new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = path
      }),
    )
  }

  return Promise.all(promises)
}

/**
 * Load a batch of images in serial mode
 *
 * @category Network
 */
export async function serialLoadImages(images: string[]) {
  for (const path in images) {
    await concurrentLoadImages([path])
  }
}

/**
 * Preload images
 *
 * It can be used to preload large images in advance, or wait for the image to
 * be loaded before ending Loading and other usage scenarios.
 *
 * @category Network
 * @example
 *   ;```ts
 *   const images = [
 *    'https://example.com/1.jpg',
 *    'https://example.com/2.jpg',
 *    'https://example.com/3.jpg',
 *   ]
 *
 *   // Start loading, Show loading icon etc.
 *   setLoading(true)
 *
 *   // Wait for the images to be pre-rendered
 *   await preloadImages(images)
 *
 *   // End loading state
 *   setLoading(false)
 *   ```
 *
 * @param images - An array containing image urls
 * @param mode - Concurrent mode is used by default. If there are too many
 *   pictures, you can choose serial mode.
 */
export async function preloadImages(
  images: string[],
  mode: 'concurrent' | 'serial' = 'concurrent',
) {
  switch (mode) {
    case 'concurrent': {
      await concurrentLoadImages(images)
      break
    }

    case 'serial': {
      await serialLoadImages(images)
      break
    }

    default: {
      await pnoop()
      break
    }
  }
}
