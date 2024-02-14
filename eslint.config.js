// @ts-check
import {
  defineFlatConfig,
  prettier,
  typescript as _typescript,
} from './packages/eslint/dist/index.mjs'

/**
 * @typedef {import('eslint-define-config').FlatESLintConfig} FlatESLintConfig
 */

const typescript = /** @type {FlatESLintConfig[]} */ (_typescript)

export default defineFlatConfig([
  ...prettier,
  ...typescript,
  {
    ignores: ['dist', 'lib', 'types', 'test'],
  },
])
