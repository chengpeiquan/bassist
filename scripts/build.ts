import { execSync } from 'child_process'
import { getArgv } from './utils.ts'

async function run() {
  const { name } = getArgv()

  execSync(`pnpm exec turbo run build --filter @bassist/${name}`, {
    stdio: 'inherit',
  })
}

run().catch((e) => {
  console.log(e)
})
