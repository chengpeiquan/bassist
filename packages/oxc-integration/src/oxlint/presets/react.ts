import { base } from '../defaults'
import { defineOxlintConfig } from '../define'

export const react = () =>
  defineOxlintConfig(base(), {
    plugins: ['react', 'react-perf', 'jsx-a11y'],
  })
