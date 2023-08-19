import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import type { FlatESLintConfigItem } from 'eslint-define-config'

export const prettier: FlatESLintConfigItem[] = [
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': 'warn',
    },
  },
]
