// import { createApp } from 'vue'
import autoRoutes from 'vite-plugin-pages/client'
import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import { RouterScrollBehavior } from 'vue-router'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'

// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from './App.vue'

// createApp(App)
//   .mount('#app')

const routes = autoRoutes.map((i) => {
  return {
    ...i,
    alias: i.path.endsWith('/')
      ? `${i.path}index.html`
      : `${i.path}.html`,
  }
})

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition)
    return savedPosition
  else
    return { top: 0 }
}

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ router, isClient }) => {
    dayjs.extend(LocalizedFormat)

    if (isClient) {
      router.beforeEach(() => { NProgress.start() })
      router.afterEach(() => { NProgress.done() })
    }
  },
)
