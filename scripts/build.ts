import { execSync } from 'child_process'
import { getArgv } from './utils'

async function run() {
  const { name } = getArgv()

  execSync(`turbo run build --filter @bassist/${name}`, {
    stdio: 'inherit',
  })
}

run().catch((e) => {
  console.log(e)
})
