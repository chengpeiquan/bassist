import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooksConfig from 'eslint-plugin-react-hooks'
import { typescript, tsParser, tsPlugin } from './typescript'
import {
  GLOB_EXCLUDE,
  GLOB_JS,
  GLOB_JSX,
  GLOB_TS,
  GLOB_TSX,
} from '../constants'
import type { FlatESLintConfig, Rules } from 'eslint-define-config'

export { reactPlugin }

const reactCustomRules = {
  'react/jsx-uses-react': 'error',
  'react/jsx-uses-vars': 'error',
} as unknown as Rules

export const react: FlatESLintConfig[] = [
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksConfig,
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...typescript[0].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksConfig.configs.recommended.rules,
      ...reactCustomRules,
    },
    ignores: [...GLOB_EXCLUDE],
  },
]
