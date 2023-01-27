import { resolve } from 'path'
import { buildLibrary } from './lib'
import { buildTypes } from './dts'
import { getArgv } from '../utils'
import { readBuildConfig } from './options'
import type { BuildOptions } from './types'

async function run() {
  const { name } = getArgv()
  const rootPath = resolve(__dirname, `../../`)
  const options: BuildOptions = { name, rootPath }

  const { commonjsExternals } = readBuildConfig(rootPath, name)
  if (Array.isArray(commonjsExternals)) {
    options.externals = commonjsExternals
  }

  await buildLibrary(options)
  await buildTypes(options)
}
run().catch((e) => {
  console.log(e)
})
