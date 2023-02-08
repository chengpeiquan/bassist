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
    `--otp ${otp}`,
  ]

  const cmds = [
    `pnpm mirror:rm`,
    `pnpm build ${name}`,
    publishArgs.join(' '),
    `pnpm mirror:set`,
  ]
  const cmd = cmds.join(' && ')
  execSync(cmd)
}
run().catch((e) => {
  console.log(e)
})
