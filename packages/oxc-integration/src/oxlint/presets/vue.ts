import { base } from '../defaults'
import { defineOxlintConfig } from '../define'

export const vue = () =>
  defineOxlintConfig(base(), {
    plugins: ['vue'],
  })
