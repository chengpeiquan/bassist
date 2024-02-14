import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import { GLOB_EXCLUDE } from '../constants'
import type { FlatESLintConfig } from 'eslint-define-config'

export { prettierPlugin }

export const prettier: FlatESLintConfig[] = [
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': 'warn',
    },
    ignores: [...GLOB_EXCLUDE],
  },
]
