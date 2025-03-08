import nextPlugin from '@next/eslint-plugin-next'
import { getConfigName } from '../shared'
import { type FlatESLintConfig } from '../types'

export { nextPlugin }

export const next: FlatESLintConfig[] = [
  {
    name: getConfigName('next'),
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
]
