import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  BundleFormat,
  createBaseConfig,
  type CreateBaseConfigOptions,
} from '../packages/build-config/src/tsdown.ts'

const readPackageJson = (configUrl: string | URL) => {
  const configPath = fileURLToPath(configUrl)
  const packageDir = dirname(configPath)
  const packageJsonPath = resolve(packageDir, 'package.json')
  return JSON.parse(readFileSync(packageJsonPath, 'utf8')) as Record<
    string,
    unknown
  >
}

export { BundleFormat }

export const createTsdownConfig = (
  configUrl: string | URL,
  options: Omit<CreateBaseConfigOptions, 'pkg'> = {},
) => {
  const pkg = readPackageJson(configUrl)
  return createBaseConfig({
    pkg,
    ...options,
  })
}
