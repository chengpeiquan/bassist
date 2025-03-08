import reactPlugin from 'eslint-plugin-react'
import reactHooksConfig from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import { GLOB_EXCLUDE, GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'
import { getConfigName } from '../shared'
import { type FlatESLintConfig, type FlatESLintRules } from '../types'
import { tsParser, tsPlugin, typescript } from './typescript'

export { reactPlugin }

const reactCustomRules = {
  'react/jsx-uses-react': 'error',
  'react/jsx-uses-vars': 'error',
} as unknown as FlatESLintRules

export const react: FlatESLintConfig[] = [
  {
    name: getConfigName('react'),
    settings: {
      react: {
        version: 'detect',
      },
    },
    files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksConfig,
      'react-refresh': reactRefresh,
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
