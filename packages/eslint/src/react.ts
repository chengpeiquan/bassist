import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooksConfig from 'eslint-plugin-react-hooks'
import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from './constants'
import type { FlatESLintConfigItem } from 'eslint-define-config'

export const react: FlatESLintConfigItem[] = [
  {
    files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
    plugins: {
      react: reactPlugin,
      reactHooks: reactHooksConfig,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksConfig.configs.recommended.rules,
    },
  },
]
