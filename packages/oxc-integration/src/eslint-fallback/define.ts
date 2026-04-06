import type { FlatESLintConfig } from '@bassist/eslint-config'

export const defineEslintConfig = (
  ...items: Array<FlatESLintConfig | FlatESLintConfig[]>
): FlatESLintConfig[] => items.flat()
