import { existsSync, mkdirpSync, writeFileSync } from '@withtypes/fs-extra'
import { resolve } from 'path'
import { generateDtsBundle } from 'dts-bundle-generator'
import type { EntryPointConfig } from 'dts-bundle-generator'
import type { BuildOptions } from '@scripts/build/types'

/**
 * Generate declaration file of library
 */
export async function buildTypes({ name }: BuildOptions) {
  const rootPath = process.cwd()
  const filePath = resolve(rootPath, `./packages/${name}/src/index.ts`)
  const options: EntryPointConfig[] = [
    {
      filePath,
      output: {
        noBanner: true,
      },
    },
  ]

  const declarations = generateDtsBundle(options, {
    preferredConfigPath: resolve(rootPath, `./tsconfig.json`),
  })
  if (!Array.isArray(declarations) || !declarations.length) return

  const outDir = resolve(rootPath, `./packages/${name}/dist`)
  !existsSync(outDir) && mkdirpSync(outDir)

  const dts = declarations[0]
  const output = resolve(outDir, `./index.d.ts`)
  writeFileSync(output, dts)
}
