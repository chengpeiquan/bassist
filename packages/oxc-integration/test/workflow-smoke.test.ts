import { spawnSync } from 'node:child_process'
import { mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { beforeAll, describe, expect, test } from 'vitest'

const testRoot = dirname(fileURLToPath(import.meta.url))
const fixtureRoot = resolve(testRoot, 'fixtures')
const packageRoot = resolve(testRoot, '..')
const repoRoot = resolve(testRoot, '../../..')
const lockRoot = resolve(repoRoot, '.tmp-test-locks')
const eslintDistLockDir = resolve(lockRoot, 'eslint-config-dist')
const workflowTestTimeout = 15_000
const pnpmBin = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const execBinExt = process.platform === 'win32' ? '.cmd' : ''
const oxlintBin = resolve(repoRoot, `node_modules/.bin/oxlint${execBinExt}`)
const eslintBin = resolve(repoRoot, `node_modules/.bin/eslint${execBinExt}`)

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

const runInFixture = (fixture: string, bin: string, args: string[]) =>
  withEslintDistLock(() =>
    spawnSync(bin, args, {
      cwd: resolve(fixtureRoot, fixture),
      encoding: 'utf8',
    }),
  )

beforeAll(() => {
  const buildResult = spawnSync(
    pnpmBin,
    ['--filter', '@bassist/oxc-integration', 'run', 'build'],
    {
      cwd: packageRoot,
      encoding: 'utf8',
    },
  )

  if (buildResult.status !== 0) {
    throw new Error(buildResult.stderr || buildResult.stdout || 'build failed')
  }
})

describe('workflow smoke fixtures', () => {
  test(
    'base fixture runs with Oxlint',
    () => {
      const result = runInFixture('base', oxlintBin, [
        '--config',
        'oxlint.config.ts',
        '.',
      ])

      expect(result.status).toBe(0)
    },
    workflowTestTimeout,
  )

  test(
    'react fixture runs with Oxlint',
    () => {
      const result = runInFixture('react', oxlintBin, [
        '--config',
        'oxlint.config.ts',
        '.',
      ])

      expect(result.status).toBe(0)
    },
    workflowTestTimeout,
  )

  test(
    'vue fixture runs with Oxlint and ESLint fallback',
    () => {
      const oxlintResult = runInFixture('vue', oxlintBin, [
        '--config',
        'oxlint.config.ts',
        '.',
      ])
      const eslintResult = runInFixture('vue', eslintBin, [
        '.',
        '--config',
        'eslint.config.mjs',
      ])

      expect(oxlintResult.status).toBe(0)
      expect(eslintResult.status).toBe(0)
    },
    workflowTestTimeout,
  )

  test(
    'markdown fixture runs with ESLint fallback',
    () => {
      const eslintResult = runInFixture('markdown', eslintBin, [
        '.',
        '--config',
        'eslint.config.mjs',
      ])

      expect(eslintResult.status).toBe(0)
    },
    workflowTestTimeout,
  )

  test(
    'jsonc fixture runs with ESLint fallback and reports sort-keys',
    () => {
      const eslintResult = runInFixture('jsonc', eslintBin, [
        '.',
        '--config',
        'eslint.config.mjs',
      ])

      expect(eslintResult.status).toBe(1)
      expect(eslintResult.stdout).toContain('jsonc/sort-keys')
      expect(eslintResult.stdout).toContain('messages.jsonc')
      expect(eslintResult.stdout).not.toContain('natural-order.jsonc')
      expect(eslintResult.stdout).not.toContain('package.json')
    },
    workflowTestTimeout,
  )
})
