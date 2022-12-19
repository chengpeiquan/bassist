import fs, { writeFileSync, readJSONSync } from '@withtypes/fs-extra'
import { resolve } from 'path'
import type { BuildOptions } from './types'

/**
 * If the CJS package has multiple APIs, it needs to support
 * named exports
 */
export const specialPackages = ['fs-extra']

/**
 * Get all member names exported by named from the package's
 * import variable
 */
function getMembers(name: string) {
  switch (name) {
    case 'fs-extra':
      return Object.keys(fs)
    default:
      return []
  }
}

/**
 * Get blacklist of APIs
 *
 * @description
 *  There may be some member names that are not actually exported,
 *  Which can be set they as a blacklist here, and they will be
 *  excluded from processing.
 *
 * @tips
 *  According to the rewritten EntryFile, you can know which APIs
 *  need to be excluded.
 *  Because when opening the entry file, VS Code will display a
 *  red error message.
 *
 * @example
 *  See `./blacklist/fs-extra.json`
 */
function getBlacklist(name: string): string[] {
  const filePath = resolve(__dirname, `./blacklist/${name}.json`)
  return readJSONSync(filePath)
}

/**
 * Generate a new entry file for the package with default exports
 * and named exports.
 */
export async function rewriteEntryFile({ name, rootPath }: BuildOptions) {
  const members = getMembers(name)
  const blacklist = getBlacklist(name)
  const whitelist = members.filter((m) => !blacklist.includes(m))
  const syntaxs = whitelist.map((w) => `const ${w} = m.${w}`)
  const contents = [
    `import m from '${name}'`,
    `export default m`,
    ``,
    `${syntaxs.join('\n')}`,
    ``,
    `export {\n\t${whitelist.join(',\n\t')},\n}`,
    ``,
  ]
  const content = contents.join('\n')
  const entryFile = resolve(rootPath, `./packages/${name}/index.ts`)
  writeFileSync(entryFile, content)
}
