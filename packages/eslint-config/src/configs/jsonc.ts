import jsoncPlugin from 'eslint-plugin-jsonc'
import * as jsoncParser from 'jsonc-eslint-parser'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'
import { getConfigName } from '../shared/utils'
import {
  type FlatESLintConfig,
  type FlatESLintParser,
  type FlatESLintPlugin,
} from '../types'

const jsonFiles = [GLOB_JSON, GLOB_JSON5, GLOB_JSONC]
const jsonPackageIgnore = ['**/package.json']

const jsoncRecommendedConfig = jsoncPlugin.configs[
  'flat/recommended-with-jsonc'
] as FlatESLintConfig[]

export { jsoncPlugin, jsoncParser }

export const jsonc: FlatESLintConfig[] = [
  {
    name: getConfigName('jsonc', 'ignore'),
    ignores: jsonPackageIgnore,
  },
  ...jsoncRecommendedConfig,
  {
    name: getConfigName('jsonc', 'base'),
    files: jsonFiles,
    ignores: jsonPackageIgnore,
    languageOptions: {
      parser: jsoncParser as FlatESLintParser,
    },
    plugins: {
      jsonc: jsoncPlugin as unknown as FlatESLintPlugin,
    },
    rules: {
      // Compatible option syntax sorts keys recursively for all JSON objects.
      'jsonc/sort-keys': [
        'error',
        'asc',
        { caseSensitive: true, natural: true, minKeys: 2 },
      ],
    },
  },
]
