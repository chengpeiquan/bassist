import { type OxlintConfig } from 'oxlint'
import { defineOxlintConfig } from './define'

export const baseOxlintConfig: OxlintConfig = {
  plugins: ['typescript', 'oxc'],
  env: {
    browser: true,
  },
  categories: {
    correctness: 'error',
    suspicious: 'error',
    pedantic: 'warn',
    style: 'off',
  },
  rules: {
    'typescript/no-explicit-any': 'off',
    'typescript/ban-ts-comment': 'off',
    'max-classes-per-file': 'off',
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'no-inline-comments': 'off',
    'no-negated-condition': 'off',
    'no-promise-executor-return': 'off',
    'no-shadow': 'off',
    radix: 'off',
    'require-await': 'off',
  },
}

export const base = (): OxlintConfig => defineOxlintConfig(baseOxlintConfig)
