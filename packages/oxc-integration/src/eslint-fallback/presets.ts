import {
  defineFlatConfig,
  imports,
  javascript,
  jsx,
  next,
  node,
  react,
  typescript,
  vue,
  type FlatESLintConfig,
} from '@bassist/eslint-config'
import vitestPlugin from '@vitest/eslint-plugin'
import pluginOxlint from 'eslint-plugin-oxlint'

type OxlintFlatConfigMap = Record<
  `flat/${string}`,
  FlatESLintConfig | FlatESLintConfig[]
>

const oxlintFlatConfigs = pluginOxlint.configs as unknown as OxlintFlatConfigMap
const testFiles = ['**/*.{test,spec}.{js,jsx,ts,tsx}']

const getDedupeConfigs = (keys: Array<`flat/${string}`>): FlatESLintConfig[] =>
  keys.flatMap((key) => {
    const config = oxlintFlatConfigs[key]

    if (!config) {
      return []
    }

    return Array.isArray(config) ? config : [config]
  })

const withOxlintDedupe = (
  configs: FlatESLintConfig[],
  keys: Array<`flat/${string}`>,
): FlatESLintConfig[] => [...configs, ...getDedupeConfigs(keys)]

const createFallbackConfig = (configs: FlatESLintConfig[]) =>
  defineFlatConfig(configs, {
    prettierEnabled: false,
    tailwindcssEnabled: false,
  })

export const base = (): FlatESLintConfig[] =>
  withOxlintDedupe(
    createFallbackConfig([...javascript, ...typescript, ...imports]),
    ['flat/eslint', 'flat/typescript', 'flat/import'],
  )

export const nodeFallback = (): FlatESLintConfig[] =>
  withOxlintDedupe(
    createFallbackConfig([...javascript, ...typescript, ...imports, ...node]),
    ['flat/eslint', 'flat/typescript', 'flat/import', 'flat/node'],
  )

export const javascriptFallback = (): FlatESLintConfig[] =>
  withOxlintDedupe(createFallbackConfig(javascript), ['flat/eslint'])

export const typescriptFallback = (): FlatESLintConfig[] =>
  withOxlintDedupe(createFallbackConfig(typescript), ['flat/typescript'])

export const jsxFallback = (): FlatESLintConfig[] => createFallbackConfig(jsx)

export const importsFallback = (): FlatESLintConfig[] =>
  withOxlintDedupe(createFallbackConfig(imports), ['flat/import'])

export const reactFallback = (): FlatESLintConfig[] =>
  withOxlintDedupe(createFallbackConfig([...imports, ...react]), [
    'flat/import',
    'flat/typescript',
    'flat/react',
    'flat/react-hooks',
    'flat/react-perf',
    'flat/jsx-a11y',
  ])

export const vueFallback = (): FlatESLintConfig[] =>
  withOxlintDedupe(createFallbackConfig([...imports, ...vue]), [
    'flat/import',
    'flat/typescript',
    'flat/vue',
  ])

export const nextFallback = (): FlatESLintConfig[] =>
  withOxlintDedupe(createFallbackConfig([...imports, ...react, ...next]), [
    'flat/import',
    'flat/typescript',
    'flat/react',
    'flat/react-hooks',
    'flat/react-perf',
    'flat/jsx-a11y',
    'flat/nextjs',
  ])

export const vitestFallback = (): FlatESLintConfig[] =>
  withOxlintDedupe(
    createFallbackConfig([
      {
        ...vitestPlugin.configs.env,
        name: '@bassist/oxc-integration/vitest/env',
        files: testFiles,
      },
      {
        ...vitestPlugin.configs.recommended,
        name: '@bassist/oxc-integration/vitest/recommended',
        files: testFiles,
      },
    ]),
    ['flat/vitest'],
  )

export const eslintPresets = {
  base,
  node: nodeFallback,
  imports: importsFallback,
  javascript: javascriptFallback,
  jsx: jsxFallback,
  next: nextFallback,
  react: reactFallback,
  typescript: typescriptFallback,
  vitest: vitestFallback,
  vue: vueFallback,
}
