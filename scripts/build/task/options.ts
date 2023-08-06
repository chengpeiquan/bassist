import { existsSync, readJsonSync } from '@withtypes/fs-extra'
import { resolve } from 'path'

/**
 * Get special build configuration
 */
export function readBuildConfig(name: string) {
  const buildConfigFile = resolve(
    process.cwd(),
    `./packages/${name}/.build/config.json`,
  )
  if (existsSync(buildConfigFile)) {
    const buildConfig = readJsonSync(buildConfigFile)
    return buildConfig
  }
  return {}
}
