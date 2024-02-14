import globals from 'globals'
import svelteParser from 'svelte-eslint-parser'
import sveltePlugin from 'eslint-plugin-svelte'
import { GLOB_EXCLUDE, GLOB_SVELTE } from '../constants'
import { typescript, tsParser, tsPlugin } from './typescript'
import type { FlatESLintConfig, Rules } from 'eslint-define-config'

export { svelteParser, sveltePlugin }

const svelteRules = {
  ...sveltePlugin.configs.recommended.rules,
} as unknown as Rules

export const svelte: FlatESLintConfig[] = [
  {
    files: [GLOB_SVELTE],
    plugins: {
      svelte: sveltePlugin,
      '@typescript-eslint': tsPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        sourceType: 'module',
        extraFileExtensions: ['.svelte'],
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    processor: sveltePlugin.processors['.svelte'],
    rules: {
      ...typescript[0].rules,
      ...svelteRules,
    },
    ignores: [...GLOB_EXCLUDE],
  },
]
