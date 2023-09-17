#!/usr/bin/env node
const { readFileSync } = require('fs')
const { resolve } = require('path')
const { name: pkgName } = require('./package.json')

// Get $1 from commit-msg script
const msgPath = process.argv[2] || resolve('.git/COMMIT_EDITMSG')
const msg = readFileSync(msgPath, 'utf-8').trim()
const commitPattern =
  /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/

if (!commitPattern.test(msg)) {
  console.log()
  console.log()
  console.log(
    `=============================== [${pkgName}] ===============================`,
  )
  console.log()
  console.log()
  console.error(
    `  ERROR: invalid commit message format. \n\n` +
      `  Proper commit message format is required for automated changelog generation. \n\n` +
      `  Examples: \n\n` +
      `    feat(utils): add 'formatTime' to format the time as 'yyyy-MM-dd HH:mm:ss' \n` +
      `    fix(eslint): fix some misconfigurations for React rules (close #24) \n\n` +
      `  See the documentation for more details. \n\n` +
      `  🚀 https://github.com/chengpeiquan/bassist/blob/main/packages/commit`,
  )
  console.log()
  console.log()
  console.log(
    `=================================================================================`,
  )
  console.log()
  process.exit(1)
}
