import { execSync } from 'node:child_process'
import minimist from '@withtypes/minimist'
import pkg from '../package.json'

async function run() {
  const argv = minimist(process.argv.slice(2), {
    string: ['_', 'preset', 'infile', 'lerna-package'],
    alias: {
      preset: 'p',
      infile: 'i',
      'release-count': 'r',
      'lerna-package': 'l',
    },
  })

  const {
    preset: presetValue,
    infile: infileValue,
    'release-count': releaseCountValue,
    'commit-path': commitPathValue,
    'lerna-package': lernaPackageValue,
  } = argv

  const preset = presetValue || 'angular'
  const infile = infileValue || 'CHANGELOG.md'
  const releaseCount = releaseCountValue || 1
  const lernaPackage = lernaPackageValue || ''
  const commitPath = commitPathValue || './src'

  const changelogArgs = [
    `conventional-changelog`,
    lernaPackage ? `--lerna-package ${lernaPackage}` : '',
    `-p ${preset}`,
    `-i ${infile}`,
    `-r ${releaseCount}`,
    `-s`,
    `--commit-path=${commitPath}`,
  ].filter((i) => !!i)

  const cmd = changelogArgs.join(' ')
  execSync(cmd)
}

run().catch((e) => {
  console.log(`[${pkg.name}]`, e)
})
