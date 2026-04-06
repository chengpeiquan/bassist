import { defineOxlintConfig, oxlintPresets } from '@bassist/oxc-integration'

export default defineOxlintConfig(
  oxlintPresets.node(),
  oxlintPresets.vitest(),
  {
    ignorePatterns: ['**/dist/**', '**/.build/**', '**/*.md'],
    overrides: [
      {
        files: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
        rules: {
          'no-new-array': 'off',
          'no-new-wrappers': 'off',
          'no-object-constructor': 'off',
          'no-thenable': 'off',
        },
      },
    ],
  },
)
