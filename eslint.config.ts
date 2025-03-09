import {
  createGetConfigNameFactory,
  defineFlatConfig,
  imports,
  markdown,
  node,
  typescript,
} from './packages/eslint-config/src'

const getConfigName = createGetConfigNameFactory('@bassist/monorepo')

export default defineFlatConfig(
  [
    ...imports,
    ...typescript,
    ...markdown,
    ...node,
    {
      name: getConfigName('ignore'),
      ignores: ['**/dist/**', '**/.build/**', '**/CHANGELOG.md'],
    },
  ],
  { tailwindcssEnabled: false },
)
