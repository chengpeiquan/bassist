// @ts-check
import { defineFlatConfig, prettier, typescript } from './packages/eslint'

export default defineFlatConfig([
  ...prettier,
  ...typescript,
  {
    ignores: ['dist', 'lib', 'types', 'test', 'eslint.config.js'],
  },
])
