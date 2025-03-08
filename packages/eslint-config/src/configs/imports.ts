import importPlugin from 'eslint-plugin-import'
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import { getConfigName } from '../shared'
import { type FlatESLintConfig } from '../types'

export { importPlugin }

export const imports: FlatESLintConfig[] = [
  {
    name: getConfigName('imports', 'base'),
    plugins: {
      import: importPlugin,
    },
    settings: {
      'import/resolver': {
        node: { extensions: ['.js', '.mjs', '.ts', '.mts', '.d.ts'] },
      },
    },
    rules: {
      'import/first': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-duplicates': 'error',
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
        },
      ],
      'import/no-default-export': 'error',
    },
  },
  {
    name: getConfigName('imports', 'special-cases'),
    files: [
      `**/*config*.${GLOB_SRC_EXT}`,
      `**/views/${GLOB_SRC}`,
      `**/pages/${GLOB_SRC}`,
      `**/{index,vite,esbuild,rollup,webpack,rspack}.ts`,
      '**/*.d.ts',
      `${GLOB_MARKDOWN}/**`,
    ],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-default-export': 'off',
    },
  },
]
