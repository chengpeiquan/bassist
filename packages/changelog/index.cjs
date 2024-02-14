#!/usr/bin/env node
// @ts-check
const { execSync } = require('node:child_process')
const minimist = require('@withtypes/minimist')

async function run() {
  const argv = minimist(process.argv.slice(2), { string: ['_'] })
  const { preset = 'angular', infile = 'CHANGELOG.md', path = './src' } = argv

  const changelogArgs = [
    `conventional-changelog`,
    `-p ${preset}`,
    `-i ${infile}`,
    `-s`,
    `--commit-path=${path}`,
  ]

  const cmd = changelogArgs.join(' ')
  execSync(cmd)
}
run().catch((e) => {
  console.log(e)
})
