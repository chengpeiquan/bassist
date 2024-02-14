import importPlugin from 'eslint-plugin-import'
import antfuPlugin from 'eslint-plugin-antfu'
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from '../constants'
import type { FlatESLintConfig } from 'eslint-define-config'

export { importPlugin, antfuPlugin }

export const imports: FlatESLintConfig[] = [
  {
    plugins: {
      import: importPlugin,
      antfu: antfuPlugin,
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

      'antfu/import-dedupe': 'error',
      'antfu/prefer-inline-type-import': 'error',
    },
  },
  {
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
