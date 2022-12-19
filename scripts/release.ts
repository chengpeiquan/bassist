import { execSync } from 'child_process'
import { resolve } from 'path'
import { getArgv } from './utils'

async function run() {
  const { name, code } = getArgv()
  const pkgPath = resolve(__dirname, `../packages/${name}`)
  const cmds = [
    `npm run build ${name}`,
    `cd ${pkgPath}`,
    `npm publish --access public --otp ${code}`,
  ]
  const cmd = cmds.join(' && ')
  execSync(cmd)
}
run().catch((e) => {
  console.log(e)
})
