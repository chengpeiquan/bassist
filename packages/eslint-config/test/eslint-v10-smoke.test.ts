import { spawnSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'

const testDir = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(testDir, '../../..')
const fixtureDir = resolve(testDir, 'fixtures/basic')
const fixtureConfigPath = resolve(fixtureDir, 'eslint.config.mjs')
const fixtureSourcePath = resolve(fixtureDir, 'src/index.ts')
const jsoncFixtureDir = resolve(testDir, 'fixtures/jsonc')
const jsoncFixtureConfigPath = resolve(jsoncFixtureDir, 'eslint.config.mjs')
const lockRoot = resolve(repoRoot, '.tmp-test-locks')
const eslintDistLockDir = resolve(lockRoot, 'eslint-config-dist')
const pnpmBin = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'

const runCommand = (args: string[]) =>
  spawnSync(pnpmBin, args, {
    cwd: repoRoot,
    encoding: 'utf8',
  })

const sleep = (ms: number) => {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

const withEslintDistLock = <T>(fn: () => T): T => {
  mkdirSync(lockRoot, { recursive: true })

  while (true) {
    try {
      mkdirSync(eslintDistLockDir)
      break
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw error
      }

      sleep(50)
    }
  }

  try {
    return fn()
  } finally {
    rmSync(eslintDistLockDir, { recursive: true, force: true })
  }
}

const runEslint = () => {
  return withEslintDistLock(() => {
    const buildResult = runCommand([
      '--filter',
      '@bassist/eslint-config',
      'run',
      'build',
    ])

    if (buildResult.status !== 0) {
      return buildResult
    }

    return runCommand([
      'exec',
      'eslint',
      '--no-config-lookup',
      '--config',
      fixtureConfigPath,
      fixtureSourcePath,
    ])
  })
}

const runEslintJsonc = () => {
  return withEslintDistLock(() => {
    const buildResult = runCommand([
      '--filter',
      '@bassist/eslint-config',
      'run',
      'build',
    ])

    if (buildResult.status !== 0) {
      return buildResult
    }

    return runCommand([
      'exec',
      'eslint',
      '--no-config-lookup',
      '--config',
      jsoncFixtureConfigPath,
      jsoncFixtureDir,
    ])
  })
}

describe('@bassist/eslint-config', () => {
  test('uses ESLint v10 in the workspace', () => {
    const result = runCommand(['exec', 'eslint', '--version'])

    expect(result.status).toBe(0)
    expect(result.stdout).toMatch(/^v10\./)
  })

  test('runs exported config with ESLint', () => {
    const result = runEslint()

    expect(result.status).toBe(0)
    expect(result.stderr).toBe('')
  })

  test('lints jsonc fixture with recursive sort-keys', () => {
    const result = runEslintJsonc()

    expect(result.status).toBe(1)
    expect(result.stdout).toContain('jsonc/sort-keys')
    expect(result.stdout).toContain('messages.jsonc')
    expect(result.stdout).not.toContain('natural-order.jsonc')
    expect(result.stdout).not.toContain('package.json')
  })
})
