import importPlugin from 'eslint-plugin-import-x'
import { getConfigName } from '../shared'
import { type FlatESLintPlugin, type FlatESLintConfig } from '../types'

export { importPlugin }

export const imports: FlatESLintConfig[] = [
  {
    name: getConfigName('imports'),
    plugins: {
      import: importPlugin as unknown as FlatESLintPlugin,
    },
    rules: {
      'import/first': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-duplicates': 'error',

      // Some scenes must provide a default export
      // e.g. Configuration files, Next.js routing, etc.
      'import/no-default-export': 'off',

      'import/no-named-default': 'error',
      'import/no-self-import': 'error',
      'import/no-webpack-loader-syntax': 'error',

      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [{ pattern: '@/**', group: 'internal' }],
          pathGroupsExcludedImportTypes: ['type'],
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
            caseInsensitive: false,
          },
        },
      ],

      'import/newline-after-import': ['error', { count: 1 }],
    },
  },
]
