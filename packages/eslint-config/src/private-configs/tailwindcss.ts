import tailwindcssPlugin from 'eslint-plugin-tailwindcss'
import { getConfigName } from '../shared'
import { type FlatESLintConfig } from '../types'

export { tailwindcssPlugin }

const recommendedConfigs = tailwindcssPlugin.configs[
  'flat/recommended'
] as FlatESLintConfig[]

export interface TailwindcssSettings {
  callees?: string[]
  config?: string
  cssFiles?: string[]
  cssFilesRefreshRate?: number
  removeDuplicates?: boolean
  skipClassAttribute?: boolean
  whitelist?: string[]
  tags?: string[]
  classRegex?: string
}

export const defaultTailwindcssSettings: TailwindcssSettings = {
  callees: ['cn', 'classNames', 'clsx'],

  // `tailwind.config.ts` is no longer supported
  // https://github.com/tailwindlabs/tailwindcss/discussions/15352
  config: 'tailwind.config.js', // returned from `loadConfig()` utility if not provided

  cssFiles: ['!**/node_modules', '!**/.*', '!**/dist'],
  cssFilesRefreshRate: 5_000,
  removeDuplicates: true,
  skipClassAttribute: false,
  whitelist: ['-webkit-box'],
  tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
  classRegex: '^class(Name)?$', // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
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
    ...recommendedConfigs,
    {
      name: getConfigName('tailwindcss', 'settings'),
      settings: {
        tailwindcss: resolvedSettings,
      },
    },
  ]

  return tailwindcss
}
