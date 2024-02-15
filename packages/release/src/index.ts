import { resolve } from 'node:path'
import { execSync } from 'node:child_process'
import { readJsonSync } from '@withtypes/fs-extra'
import { getName, getNotes, getRepo } from './utils'
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
  const pkgJson = readJsonSync(pkgPath) || {}

  const { name, version, repository } = pkgJson
  if (!name) {
    throw new Error(`[${pkg.name}] Missing package name`)
  }
  if (!version) {
    throw new Error(`[${pkg.name}] Missing package version`)
  }
  if (!repository) {
    throw new Error(`[${pkg.name}] Missing package repository`)
  }

  const repoInfo = getRepo(repository)
  if (!repoInfo) {
    throw new Error(`[${pkg.name}] Unsupported repository information`)
  }

  const notes = getNotes({
    repoInfo,
    branch,
    changelog,
  })

  const isMonorepo = !!repoInfo.directory
  const pkgName = getName(name)
  const tagName = isMonorepo ? `${pkgName}@${version}` : `v${version}`

  const releaseArgs = [
    'gh --version',
    `git tag -a ${tagName} -m "${tagName}"`,
    `git push origin ${tagName}`,
    `gh release create ${tagName} --title "${tagName}" --notes "${notes}"`,
  ]

  const cmd = releaseArgs.join(' && ')
  execSync(cmd)
}
run().catch((e) => {
  console.log(e)
})
