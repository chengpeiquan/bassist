import tailwindcssPlugin from 'eslint-plugin-better-tailwindcss'
import { getDefaultSelectors } from 'eslint-plugin-better-tailwindcss/api/defaults'
import { type Selectors } from 'eslint-plugin-better-tailwindcss/api/types'
import { getConfigName } from '../shared/utils'
import { type FlatESLintConfig } from '../types'

export { tailwindcssPlugin }

const recommendedConfig = tailwindcssPlugin.configs
  .recommended as FlatESLintConfig

export interface TailwindcssSettings {
  attributes?: string[]
  callees?: string[]
  cwd?: string
  detectComponentClasses?: boolean
  entryPoint?: string
  messageStyle?: 'visual' | 'compact' | 'raw'
  rootFontSize?: number
  selectors?: Selectors
  tags?: string[]
  tailwindConfig?: string
  tsconfig?: string
  variables?: string[]
}

export const defaultTailwindcssSettings: TailwindcssSettings = {
  selectors: getDefaultSelectors(),
}

const mergeSettings = (inputSettings: TailwindcssSettings) => {
  if (inputSettings && Object.keys(inputSettings).length > 0) {
    return {
      ...defaultTailwindcssSettings,
      ...inputSettings,
    }
  }

  return { ...defaultTailwindcssSettings }
}

export const createTailwindcssConfig = (
  inputSettings: TailwindcssSettings = {},
) => {
  const resolvedSettings = mergeSettings(inputSettings)

  const tailwindcss: FlatESLintConfig[] = [
    recommendedConfig,
    {
      name: getConfigName('tailwindcss', 'settings'),
      settings: {
        'better-tailwindcss': resolvedSettings,
      },
    },
  ]

  return tailwindcss
}
