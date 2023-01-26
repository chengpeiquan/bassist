import { resolve } from 'path'
import { buildLibrary } from './lib'
import { buildTypes } from './dts'
import { getArgv } from '../utils'

async function run() {
  const { name } = getArgv()
  const rootPath = resolve(__dirname, `../../`)
  const options = { name, rootPath }

  await buildLibrary(options)
  await buildTypes(options)
}
run().catch((e) => {
  console.log(e)
})
