import { resolve } from 'path'
import { readdirSync } from '@withtypes/fs-extra'
import { buildPackage } from './task'

async function run() {
  const packages = readdirSync(resolve(process.cwd(), `./packages`))
    .filter((i) => !i.startsWith('.'))
    .toReversed()

  console.log()
  console.log('Start building, packages is as follows:')
  console.log(packages)
  console.log()

  for (let i = 0; i < packages.length; i++) {
    const name = packages[i]
    await buildPackage(name)
  }
}
run().catch((e) => {
  console.log(e)
})
