import markdownPlugin from '@eslint/markdown'
import {
  GLOB_EXCLUDE,
  GLOB_MARKDOWN,
  GLOB_MARKDOWN_CODE,
  GLOB_VUE,
} from '../globs'
import { getConfigName } from '../shared'
import { type FlatESLintConfig } from '../types'

export { markdownPlugin }

export const markdown: FlatESLintConfig[] = [
  ...markdownPlugin.configs.processor,
  ...markdownPlugin.configs.recommended,
  {
    name: getConfigName('markdown'),
    files: [GLOB_MARKDOWN_CODE, `${GLOB_MARKDOWN}/${GLOB_VUE}`],
    language: 'markdown/commonmark',
    rules: {
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'no-alert': 'off',
      'no-console': 'off',
      'no-restricted-imports': 'off',
      'no-undef': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off',
      'node/prefer-global/buffer': 'off',
      'node/prefer-global/process': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
    ignores: [...GLOB_EXCLUDE],
  },
]
