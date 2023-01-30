import { execSync } from 'child_process'
import { resolve } from 'path'
import { getArgv } from './utils'

async function run() {
  const { name } = getArgv()
  const pkgPath = resolve(__dirname, `../packages/${name}`)

  const changelogArgs = [
    `conventional-changelog`,
    `--lerna-package ${name}`,
    `-p angular`,
    `-i CHANGELOG.md`,
    `-s`,
    `--commit-path=.`,
  ]

  const cmds = [`cd ${pkgPath}`, changelogArgs.join(' ')]
  const cmd = cmds.join(' && ')
  execSync(cmd)
}
run().catch((e) => {
  console.log(e)
})
