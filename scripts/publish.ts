import { execSync } from 'child_process'
import { getArgv } from './utils.ts'

async function run() {
  const { name, otp, tag } = getArgv()

  const publishArgs = [
    `pnpm --filter @bassist/${name} publish`,
    `--no-git-checks`,
    `--access public`,
    `--registry https://registry.npmjs.org/`,
    `${tag ? `--tag ${tag}` : ''}`,
    `${otp ? `--otp=${otp}` : ''}`,
  ].filter(Boolean)

  const commands = [`pnpm run build:lib ${name}`, publishArgs.join(' ')]
  const cmd = commands.join(' && ')
  execSync(cmd, { stdio: 'inherit' })
}

run().catch((e) => {
  console.log(e)
})
