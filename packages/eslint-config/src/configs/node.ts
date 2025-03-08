import nodePlugin from 'eslint-plugin-n'
import { getConfigName } from '../shared'
import { type FlatESLintConfig } from '../types'

export const node: FlatESLintConfig[] = [
  {
    name: getConfigName('node'),
    plugins: {
      n: nodePlugin,
    },
    rules: {
      'n/handle-callback-err': ['error', '^(err|error)$'],
      'n/no-deprecated-api': 'error',
      'n/no-exports-assign': 'error',
      'n/no-new-require': 'error',
      'n/no-path-concat': 'error',
      'n/prefer-global/buffer': ['error', 'never'],
      'n/prefer-global/process': ['error', 'never'],
      'n/process-exit-as-throw': 'error',
    },
  },
]
