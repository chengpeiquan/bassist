import { execSync } from 'node:child_process'
import { resolve } from 'node:path'
import process from 'node:process'
import { getArgv } from './utils.ts'

async function run() {
  const { name } = getArgv()

  const pkgPath = resolve(process.cwd(), `./packages/${name}`)

  const changelogArgs = [
    `conventional-changelog`,
    `--lerna-package ${name}`,
    `-p angular`,
    `-i CHANGELOG.md`,
    `-s`,
    `--commit-path=.`,
  ]

  const commands = [`cd ${pkgPath}`, changelogArgs.join(' ')]
  const cmd = commands.join(' && ')
  execSync(cmd, { stdio: 'inherit' })
}

run().catch((e) => {
  console.log(e)
})
