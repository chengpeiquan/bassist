import { buildByTsup } from './builder'
import { readBuildConfig } from './utils'
import { type BuildOptions } from './types'

async function build(options: BuildOptions) {
  await buildByTsup(options)
}

async function buildMultiple(entryFiles: string[], options: BuildOptions) {
  entryFiles.forEach(async (entryFile) => {
    await build({ ...options, entryFile })
  })
}

export async function buildPackage(name: string) {
  const options: BuildOptions = { name }

  const { skip, bin, entryFile, entryFiles, formats } = readBuildConfig(name)
  if (skip) return

  options.bin = bin
  options.formats = formats

  if (Array.isArray(entryFiles)) {
    await buildMultiple(entryFiles, options)
    return
  }

  if (entryFile) {
    options.entryFile = entryFile
  }

  await build(options)
}
