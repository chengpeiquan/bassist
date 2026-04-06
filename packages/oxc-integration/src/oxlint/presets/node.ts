import { base } from '../defaults'
import { defineOxlintConfig } from '../define'

export const node = () =>
  defineOxlintConfig(base(), {
    env: {
      browser: false,
      node: true,
    },
  })
