/**
 * @typedef {import('../types').PartialPrettierExtendedOptions} PartialPrettierExtendedOptions
 */

/**
 * Prettier Config Plugins
 *
 * @type {NonNullable<PartialPrettierExtendedOptions['plugins']>}
 */
export const defaultPrettierPlugins = [
  'prettier-plugin-jsdoc',
  'prettier-plugin-lint-md',
]

/**
 * Prettier Config
 *
 * @type {PartialPrettierExtendedOptions}
 */
export default {
  /**
   * Prettier Options
   *
   * @see https://prettier.io/docs/options
   */

  // Maximum 80 characters per line
  printWidth: 80,
  // Use 2 spaces for indentation
  tabWidth: 2,
  // Use spaces instead of tabs for indentation
  useTabs: false,
  // Add semicolons at the end of statements
  semi: false,
  // Use single quotes instead of double quotes
  singleQuote: true,
  // Only quote object properties when necessary
  quoteProps: 'as-needed',
  // Use double quotes instead of single quotes in JSX
  jsxSingleQuote: false,
  // Add trailing commas wherever possible
  trailingComma: 'all',
  // Add spaces between brackets in object literals
  bracketSpacing: true,
  // Put the > of JSX elements at the end of the last line
  jsxBracketSameLine: false,
  // Always include parentheses around arrow function parameters
  arrowParens: 'always',
  // Format the entire file content
  rangeStart: 0,
  rangeEnd: Infinity,
  // Don't require @prettier pragma at the beginning of files
  requirePragma: false,
  // Don't automatically insert @prettier pragma at the beginning of files
  insertPragma: false,
  // Use default prose wrapping standard
  proseWrap: 'preserve',
  // Determine HTML line breaks based on display style
  htmlWhitespaceSensitivity: 'css',
  // Use LF line endings
  endOfLine: 'lf',
  // Explicitly specify plugins here to ensure Prettier loads custom plugins
  // (like jsdoc and lint-md) when run directly via CLI.
  plugins: [...defaultPrettierPlugins],

  /**
   * JSDoc Options
   *
   * @see https://github.com/hosseinmd/prettier-plugin-jsdoc#options
   */

  jsdocCommentLineStrategy: 'multiline',
}
