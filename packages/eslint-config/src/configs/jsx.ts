import { GLOB_JSX, GLOB_TSX } from '../globs'
import { getConfigName } from '../shared'
import { type FlatESLintConfig } from '../types'

export const jsx: FlatESLintConfig[] = [
  {
    name: getConfigName('jsx'),
    files: [GLOB_JSX, GLOB_TSX],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
]
