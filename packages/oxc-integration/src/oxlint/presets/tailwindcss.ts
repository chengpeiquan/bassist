import tailwindcssPlugin from 'eslint-plugin-better-tailwindcss'
import { type OxlintConfig } from 'oxlint'
import { base } from '../defaults'
import { defineOxlintConfig } from '../define'

type BetterTailwindcssSettings = NonNullable<OxlintConfig['settings']>[string]

export const tailwindcss = (
  settings?: BetterTailwindcssSettings,
): OxlintConfig => {
  const recommendedConfig = tailwindcssPlugin.configs.recommended

  return defineOxlintConfig(base(), {
    jsPlugins: ['eslint-plugin-better-tailwindcss'],
    rules: recommendedConfig.rules,
    settings: settings
      ? {
          'better-tailwindcss': settings,
        }
      : undefined,
  })
}
