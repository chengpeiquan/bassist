import { resolve } from 'path'
import { buildLibrary } from './lib'
import { buildTypes } from './dts'
import { specialPackages, rewriteEntryFile } from './sync'
import { getArgv } from '../utils'

async function run() {
  const { name } = getArgv()
  const rootPath = resolve(__dirname, `../../`)
  const options = { name, rootPath }

  if (specialPackages.includes(name)) {
    await rewriteEntryFile(options)
  }
  await buildLibrary(options)
  await buildTypes(options)
}
run().catch((e) => {
  console.log(e)
})
