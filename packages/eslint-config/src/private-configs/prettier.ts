import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import {
  type BuiltInParserName,
  type LiteralUnion,
  type RequiredOptions,
} from 'prettier'
import { type Options as JsdocOptions } from 'prettier-plugin-jsdoc'
import { GLOB_EXCLUDE } from '../globs'
import { getConfigName } from '../shared'
import { type FlatESLintConfig } from '../types'

export { prettierPlugin }

export type PrettierParser = BuiltInParserName

export interface PrettierOptions extends RequiredOptions {
  parser: LiteralUnion<PrettierParser>
}

export type PartialPrettierExtendedOptions = Partial<PrettierOptions> &
  Partial<JsdocOptions>

const isValidPrettierRules = (
  prettierRules: unknown,
): prettierRules is PartialPrettierExtendedOptions => {
  return Object.prototype.toString.call(prettierRules) === '[object Object]'
}

const loadPrettierConfig = (cwd: string): PartialPrettierExtendedOptions => {
  try {
    const prettierrc = readFileSync(join(cwd, '.prettierrc'), 'utf-8')
    return prettierrc ? JSON.parse(prettierrc) : {}
  } catch {
    return {}
  }
}

const loadPrettierIgnore = (cwd: string): string[] => {
  try {
    const prettierignore = readFileSync(join(cwd, '.prettierignore'), 'utf-8')
    return prettierignore
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'))
  } catch {
    return []
  }
}

export const createPrettierConfig = (
  cwd: string,
  inputConfig?: PartialPrettierExtendedOptions,
) => {
  const resolvedConfig = isValidPrettierRules(inputConfig)
    ? inputConfig
    : loadPrettierConfig(cwd)

  const { plugins = [] } = resolvedConfig

  const finalPrettierConfig: PartialPrettierExtendedOptions = {
    ...resolvedConfig,
    plugins: [...plugins, './node_modules/prettier-plugin-jsdoc/dist/index.js'],
  }

  const resolvedIgnore = loadPrettierIgnore(cwd)

  const finalIgnore = Array.from(new Set([...GLOB_EXCLUDE, ...resolvedIgnore]))

  const prettier: FlatESLintConfig[] = [
    {
      name: getConfigName('prettier'),
      plugins: {
        prettier: prettierPlugin,
      },
      rules: {
        ...prettierConfig.rules,
        'prettier/prettier': ['warn', finalPrettierConfig],
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
      },
      ignores: finalIgnore,
    },
  ]

  return prettier
}
