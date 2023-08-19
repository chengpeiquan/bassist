import { buildTypes } from './dts'
import { buildLibrary } from './lib'
import type { BuildOptions } from '@scripts/build/types'

export async function buildByVite(options: BuildOptions) {
  await buildLibrary(options)
  await buildTypes(options)
}
