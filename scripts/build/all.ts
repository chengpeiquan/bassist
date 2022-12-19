import { resolve } from 'path'
import { buildLibrary } from './lib'
import { buildTypes } from './dts'
import { specialPackages, rewriteEntryFile } from './sync'
import { readdirSync } from '@withtypes/fs-extra'

async function run() {
  const rootPath = resolve(__dirname, `../../`)
  const packages = readdirSync(resolve(rootPath, `./packages`))
  console.log(packages)

  for (let i = 0; i < packages.length; i++) {
    const name = packages[i]
    const options = { name, rootPath }

    if (specialPackages.includes(name)) {
      await rewriteEntryFile(options)
    }
    await buildLibrary(options)
    await buildTypes(options)
  }
}
run().catch((e) => {
  console.log(e)
})
