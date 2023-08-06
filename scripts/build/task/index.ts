import { buildTypes } from './dts'
import { buildLibrary } from './lib'
import { readBuildConfig } from './options'
import type { BuildOptions } from './types'

export async function buildPackage(name: string) {
  const options: BuildOptions = { name }

  const { externals, skip } = readBuildConfig(name)
  if (skip) return
  if (Array.isArray(externals)) {
    options.externals = externals
  }

  await buildLibrary(options)
  await buildTypes(options)
}
