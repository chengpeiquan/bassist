import { defineEslintConfig, eslintPresets } from '@bassist/oxc-integration'

export default defineEslintConfig(
  eslintPresets.node(),
  eslintPresets.vitest(),
  {
    name: '@bassist/monorepo/ignore',
    ignores: ['**/dist/**', '**/.build/**', '**/CHANGELOG.md'],
  },
)
