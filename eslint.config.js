// @ts-check

import { defineEslintConfig, eslintPresets } from '@bassist/oxc-integration'

export default defineEslintConfig(
  eslintPresets.node(),
  eslintPresets.vitest(),
  eslintPresets.imports(),
  eslintPresets.jsonc(),

  {
    name: '@bassist/monorepo/ignore',
    ignores: ['**/dist/**', '**/.build/**', '**/.turbo/**', '**/CHANGELOG.md'],
  },
)
