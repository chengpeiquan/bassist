import nprogress from 'nprogress'
import resource from 'nprogress/nprogress.css?inline'
import { loadRes, isBrowser, randomString } from '@bassist/utils'
import type { NProgress } from 'nprogress'

loadRes({
  type: 'style',
  id: 'bassist-nprogress',
  resource,
}).catch((e) => {
  console.log(e)
})

export interface Progress extends NProgress {
  /**
   *
   * @param color - A valid CSS color value or CSS variable
   *
   * @example use HEX
   *  progress.setColor('#ff0000')
   *
   * @example use RGB
   *  progress.setColor('rgb(255, 0, 0)')
   *
   * @example use RGBA
   *  progress.setColor('rgba(255, 0, 0, 1)')
   *
   * @example use CSS Variable
   *  progress.setColor('var(--color-primary)')
   */
  // eslint-disable-next-line no-unused-vars
  setColor: (color: string) => void
}

const progress = nprogress as Progress

progress.setColor = function (color: string) {
  if (!isBrowser) return

  const style = `
    #nprogress .bar {
      background: ${color} !important;
    }
    #nprogress .peg {
      box-shadow: 0 0 10px ${color}, 0 0 5px ${color} !important;
    }
    #nprogress .spinner .spinner-icon {
      border-top-color: ${color} !important;
      border-left-color: ${color} !important;
    }
  `

  loadRes({
    type: 'style',
    id: `bassist-nprogress-theme-${randomString()}`,
    resource: style,
  }).catch((e) => {
    console.log(e)
  })
}

export default progress
