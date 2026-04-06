import { base } from '../defaults'
import { defineOxlintConfig } from '../define'

export const vitest = () =>
  defineOxlintConfig(base(), {
    plugins: ['vitest'],
  })
