import { getArgv } from '../utils'
import { buildPackage } from './task'

async function run() {
  const { name } = getArgv()
  await buildPackage(name)
}
run().catch((e) => {
  console.log(e)
})
