// @ts-check
import { defineConfig, prettier, vue } from './packages/eslint/dist/index.cjs'

export default defineConfig([
  ...prettier,
  ...vue,
  {
    ignores: ['dist', 'lib', 'types', 'test'],
  },
])
