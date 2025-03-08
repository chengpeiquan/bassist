import {
  createPrettierConfig,
  type PartialPrettierExtendedOptions,
} from './private-configs/prettier'
import {
  createTailwindcssConfig,
  type TailwindcssSettings,
} from './private-configs/tailwindcss'
import { type FlatESLintConfig } from './types'

export interface DefineFlatConfigOptions {
  /**
   * Specifies the working directory for loading the `.prettierrc`
   * configuration.
   *
   * The config file should be in JSON format.
   *
   * @default process.cwd()
   */
  cwd?: string

  /**
   * If `prettierEnabled` is set to `false`, all Prettier-related rules and
   * configurations will be ignored, even if `prettierRules` are provided.
   *
   * @default true
   */
  prettierEnabled?: boolean

  /**
   * By default, this will read `.prettierrc` from the current working
   * directory, and the `.prettierrc` file must be written in JSON format.
   *
   * If you are not using a config file with JSON content, or a different config
   * file name, you can convert it to JSON rules and pass it in.
   *
   * After reading the custom configuration, it will be merged with the default
   * ESLint rules.
   *
   * @see https://prettier.io/docs/configuration.html
   */
  prettierRules?: PartialPrettierExtendedOptions

  /**
   * Tailwindcss rules are enabled by default. If they interfere with your
   * project, you can disable them with this option.
   *
   * @default true
   */
  tailwindcssEnabled?: boolean

  /**
   * If you need to override the configuration, you can pass the corresponding
   * options.
   *
   * If you want to merge configurations, you can import
   * `defaultTailwindcssSettings`, merge them yourself, and then pass the result
   * in.
   *
   * If an empty object `{}` is passed, the default settings will be used.
   */
  tailwindcssSettings?: TailwindcssSettings
}

/**
 * Define the ESLint configuration with optional Prettier integration.
 *
 * @param configs The base ESLint configurations.
 * @param options - Options for defining the configuration.
 * @returns The final ESLint configuration array.
 */
export const defineFlatConfig = (
  configs: FlatESLintConfig[],
  options: DefineFlatConfigOptions = {},
) => {
  const {
    cwd = process.cwd(),
    prettierEnabled = true,
    prettierRules,
    tailwindcssEnabled = true,
    tailwindcssSettings,
  } = options

  const prettierConfig = prettierEnabled
    ? createPrettierConfig(cwd, prettierRules)
    : []

  const tailwindcssConfig = tailwindcssEnabled
    ? createTailwindcssConfig(tailwindcssSettings)
    : []

  return [...prettierConfig, ...tailwindcssConfig, ...configs]
}
