import { resolve } from 'node:path'
import { execSync } from 'node:child_process'
import { readJsonSync } from '@withtypes/fs-extra'
import { getNotes } from './utils'
import minimist from '@withtypes/minimist'
import pkg from '../package.json'

async function run() {
  const argv = minimist(process.argv.slice(2), {
    string: ['_', 'branch', 'changelog'],
    alias: {
      branch: 'b',
      changelog: 'c',
    },
  })

  const { branch = 'main', changelog = 'CHANGELOG.md' } = argv

  const cwd = process.cwd()
  const pkgPath = resolve(cwd, './package.json')
  const json = readJsonSync(pkgPath) || {}

  const { version, repository } = json
  if (!version) {
    throw new Error(`[${pkg.name}] Missing package version`)
  }
  if (!repository) {
    throw new Error(`[${pkg.name}] Missing package repository`)
  }

  const notes = getNotes({
    repository,
    branch,
    changelog,
  })

  const releaseArgs = [
    'gh --version',
    `git tag -a v${version} -m "v${version}"`,
    `git push origin v${version}`,
    `gh release create v${version} --title "v${version}" --notes "${notes}"`,
  ]

  const cmd = releaseArgs.join(' && ')
  execSync(cmd)
}
run().catch((e) => {
  console.log(e)
})
