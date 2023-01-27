import { existsSync, readJsonSync } from '@withtypes/fs-extra'
import { resolve } from 'path'

/**
 * Get special build configuration
 */
export function readBuildConfig(rootPath: string, name: string) {
  const buildConfigFile = resolve(rootPath, `./packages/${name}/build.json`)
  if (existsSync(buildConfigFile)) {
    const buildConfig = readJsonSync(buildConfigFile)
    return buildConfig
  }
  return {}
}
