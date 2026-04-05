import { execSync } from 'child_process'
import { resolve } from 'path'
import { getArgv } from './utils'

async function run() {
  const { name, otp, tag } = getArgv()
  const pkgPath = resolve(import.meta.dirname, `../packages/${name}`)

  const publishArgs = [
    `bun publish`,
    `--access public`,
    `${tag ? `--tag ${tag}` : ''}`,
    `${otp ? `--otp=${otp}` : ''}`,
  ].filter(Boolean)

  const commands = [
    `bun run build:lib ${name}`,
    `cd ${pkgPath}`,
    publishArgs.join(' '),
  ]
  const cmd = commands.join(' && ')
  execSync(cmd, { stdio: 'inherit' })
}

run().catch((e) => {
  console.log(e)
})
