import { execSync } from 'child_process'
import { getArgv } from './utils'

async function run() {
  const { name, otp, tag } = getArgv()

  const publishArgs = [
    `pnpm publish`,
    `-r ${name}`,
    `--no-git-checks`,
    `--access public`,
    `${tag ? `--tag ${tag}` : ''}`,
    `${otp ? `--otp=${otp}` : ''}`,
    `--registry https://registry.npmjs.org/`,
  ].filter(Boolean)

  const commands = [`pnpm build:lib ${name}`, publishArgs.join(' ')]
  const cmd = commands.join(' && ')
  execSync(cmd)
}

run().catch((e) => {
  console.log(e)
})
