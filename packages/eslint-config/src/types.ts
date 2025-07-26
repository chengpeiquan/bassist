import { type ESLint, type Linter } from 'eslint'
import {
  type RequiredOptions as PrettierRequiredOptions,
  type BuiltInParserName as PrettierParser,
  type LiteralUnion as PrettierLiteralUnion,
} from 'prettier'
import { type Options as PrettierJsdocOptions } from 'prettier-plugin-jsdoc'
import { type prettierLintMd } from 'prettier-plugin-lint-md'

export type FlatESLintConfig = Linter.Config

export type FlatESLintPlugin = ESLint.Plugin

export type FlatESLintParser = Linter.Parser

export type FlatESLintProcessor = Linter.Processor

export type FlatESLintRules = Linter.RulesRecord

/**
 * Prettier types
 */
export { type PrettierParser }

export interface PrettierOptions extends PrettierRequiredOptions {
  parser: PrettierLiteralUnion<PrettierParser>
}

export type PrettierLintMdOptions = NonNullable<
  Parameters<typeof prettierLintMd>[0]
>

export { type PrettierJsdocOptions }

export type PartialPrettierExtendedOptions = Partial<PrettierOptions> &
  Partial<PrettierJsdocOptions> &
  Partial<PrettierLintMdOptions>
