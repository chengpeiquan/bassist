import { spawnSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const packageDir = resolve(scriptDir, '..')
const repoRoot = resolve(packageDir, '../..')
const fixtureConfigPath = resolve(
  packageDir,
  'test/fixtures/basic/eslint.config.mjs',
)
const fixtureSourcePath = resolve(
  packageDir,
  'test/fixtures/basic/src/index.ts',
)
const pnpmBin = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'

const runCommand = (args: string[]) => {
  const result = spawnSync(pnpmBin, args, {
    cwd: repoRoot,
    encoding: 'utf8',
  })

  if (result.status !== 0) {
    const details = [result.stdout, result.stderr].filter(Boolean).join('\n')
    throw new Error(details || `Command failed: pnpm ${args.join(' ')}`)
  }

  return result
}

const version = runCommand(['exec', 'eslint', '--version']).stdout.trim()

if (!/^v10\./.test(version)) {
  throw new Error(`Expected ESLint v10, received ${version}`)
}

runCommand(['--filter', '@bassist/eslint-config', 'run', 'build'])
runCommand([
  'exec',
  'eslint',
  '--no-config-lookup',
  '--config',
  fixtureConfigPath,
  fixtureSourcePath,
])

console.log(`Verified @bassist/eslint-config with ${version}`)
