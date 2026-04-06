import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { beforeAll, describe, expect, test } from 'vitest'

const testRoot = dirname(fileURLToPath(import.meta.url))
const fixtureRoot = resolve(testRoot, 'fixtures')
const packageRoot = resolve(testRoot, '..')

const runInFixture = (fixture: string, args: string[]) =>
  spawnSync('bun', args, {
    cwd: resolve(fixtureRoot, fixture),
    encoding: 'utf8',
  })

beforeAll(() => {
  const buildResult = spawnSync(
    'bun',
    ['run', '--filter', '@bassist/oxc-integration', 'build'],
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
  test('base fixture runs with Oxlint', () => {
    const result = runInFixture('base', [
      'x',
      'oxlint',
      '--config',
      'oxlint.config.ts',
      '.',
    ])

    expect(result.status).toBe(0)
  })

  test('react fixture runs with Oxlint', () => {
    const result = runInFixture('react', [
      'x',
      'oxlint',
      '--config',
      'oxlint.config.ts',
      '.',
    ])

    expect(result.status).toBe(0)
  })

  test('vue fixture runs with Oxlint and ESLint fallback', () => {
    const oxlintResult = runInFixture('vue', [
      'x',
      'oxlint',
      '--config',
      'oxlint.config.ts',
      '.',
    ])
    const eslintResult = runInFixture('vue', [
      'x',
      'eslint',
      '.',
      '--config',
      'eslint.config.mjs',
    ])

    expect(oxlintResult.status).toBe(0)
    expect(eslintResult.status).toBe(0)
  })
})
