import { resolve } from 'path'
import { copyDir, remove } from '../utils'
import type { BuildOptions } from './types'

/**
 * Output declaration file of library
 */
export async function buildTypes({ name, rootPath }: BuildOptions) {
  // Use existing declaration files from `@types/${name}` as package declaration
  const typesPackage = resolve(rootPath, `./node_modules/@types/${name}`)
  const typesDir = resolve(rootPath, `./packages/${name}/types`)
  copyDir(typesPackage, typesDir)

  // Remove unnecessary files
  const files = ['package.json', 'README.md']
  files.forEach((name) => {
    const file = resolve(typesDir, name)
    remove('file', file)
  })
}
