import { defineConfig, type OxfmtConfig } from 'oxfmt'

export const defaultOxfmtConfig: OxfmtConfig = defineConfig({
  printWidth: 80,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
})
