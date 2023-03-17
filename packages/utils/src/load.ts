import { isBrowser } from './device'

/**
 * @category network
 */
export type ResourcesSupportedWithLoadRes = 'js' | 'css' | 'style'

/**
 * @category network
 */
export interface LoadResOptions {
  type: ResourcesSupportedWithLoadRes
  id: string
  resource: string
}

/**
 * @category network
 */
export function loadRes({ type, id, resource }: LoadResOptions) {
  return new Promise((resolve, reject) => {
    if (!isBrowser || document.querySelector(id)) {
      reject()
      return
    }

    function bindStatus(
      el: HTMLScriptElement | HTMLLinkElement | HTMLStyleElement
    ) {
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
