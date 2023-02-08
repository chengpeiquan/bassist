import nprogress from 'nprogress'
import resource from 'nprogress/nprogress.css?inline'
import { loadRes, isBrowser, randomString } from '@bassist/utils'
import type { Progress } from './types'

loadRes({
  type: 'style',
  id: 'bassist-nprogress',
  resource,
}).catch((e) => {
  console.log(e)
})

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

export default progress as Progress
