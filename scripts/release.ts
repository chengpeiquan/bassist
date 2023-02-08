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
    `pnpm build ${name}`,
    `pnpm mirror:rm`,
    publishArgs.join(' '),
    `pnpm mirror:set`,
  ]
  const cmd = cmds.join(' && ')
  execSync(cmd)
}
run().catch((e) => {
  console.log(e)
})
