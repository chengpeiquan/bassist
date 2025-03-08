import {
  defineFlatConfig,
  markdown,
  node,
  typescript,
} from './packages/eslint-config/src'

export default defineFlatConfig(
  [
    ...typescript,
    ...markdown,
    ...node,
    {
      name: '@bassist/monorepo/ignore',
      ignores: ['**/dist/**', '**/.build/**', '**/CHANGELOG.md'],
    },
  ],
  { tailwindcssEnabled: false },
)
