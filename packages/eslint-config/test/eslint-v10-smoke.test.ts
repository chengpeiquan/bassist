import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const testDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(testDir, '../../..')
const fixtureDir = resolve(testDir, 'fixtures/basic')
const fixtureConfigPath = resolve(fixtureDir, 'eslint.config.mjs')
const fixtureSourcePath = resolve(fixtureDir, 'src/index.ts')
const bunBin = process.platform === 'win32' ? 'bun.exe' : 'bun'

const runCommand = (args: string[]) =>
  spawnSync(bunBin, args, {
    cwd: repoRoot,
    encoding: 'utf8',
  })

const runEslint = () => {
  const buildResult = runCommand([
    'run',
    '--filter',
    '@bassist/eslint-config',
    'build',
  ])

  if (buildResult.status !== 0) {
    return buildResult
  }

  return runCommand([
    'x',
    'eslint',
    '--no-config-lookup',
    '--config',
    fixtureConfigPath,
    fixtureSourcePath,
  ])
}

describe('@bassist/eslint-config', () => {
  test('uses ESLint v10 in the workspace', () => {
    const result = runCommand(['x', 'eslint', '--version'])

    expect(result.status).toBe(0)
    expect(result.stdout).toMatch(/^v10\./)
  })

  test('runs exported config with ESLint', () => {
    const result = runEslint()

    expect(result.status).toBe(0)
    expect(result.stderr).toBe('')
  })
})
