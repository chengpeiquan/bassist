import _tsPlugin from '@typescript-eslint/eslint-plugin'
import __tsParser from '@typescript-eslint/parser'
import { GLOB_TS, GLOB_TSX } from '../globs'
import { getConfigName } from '../shared'
import {
  type FlatESLintConfig,
  type FlatESLintParser,
  type FlatESLintPlugin,
} from '../types'

const tsParser = __tsParser as FlatESLintParser
const tsPlugin = _tsPlugin as unknown as FlatESLintPlugin

export { tsParser, tsPlugin }

const tsPluginConfigs = _tsPlugin.configs
const recommendedConfigs = tsPluginConfigs['eslint-recommended']

export const typescript: FlatESLintConfig[] = [
  {
    name: getConfigName('typescript', 'base'),
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...recommendedConfigs.overrides![0].rules,
      ...tsPluginConfigs.strict.rules,
      '@typescript-eslint/no-redeclare': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/prefer-as-const': 'warn',
    },
  },
  {
    name: getConfigName('typescript', 'declaration'),
    files: ['**/*.d.ts'],
    rules: {
      'import/no-duplicates': 'off',
    },
  },
  {
    name: getConfigName('typescript', 'test'),
    files: ['**/*.{test,spec}.ts?(x)'],
    rules: {
      'no-unused-expressions': 'off',
    },
  },
  {
    name: getConfigName('typescript', 'js-compat'),
    files: ['**/*.js', '**/*.cjs'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
]
