import {
  createGetConfigNameFactory,
  defineFlatConfig,
  imports,
  markdown,
  // jsdoc,
  node,
  typescript,
} from './packages/eslint-config/src'

const getConfigName = createGetConfigNameFactory('@bassist/monorepo')

export default defineFlatConfig(
  [
    ...imports,
    ...typescript,
    ...markdown,
    // ...jsdoc,
    ...node,
    {
      name: getConfigName('ignore'),
      ignores: ['**/dist/**', '**/.build/**', '**/CHANGELOG.md'],
    },
  ],
  { tailwindcssEnabled: false },
)
