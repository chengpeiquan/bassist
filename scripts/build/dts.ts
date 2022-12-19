import { existsSync, mkdirpSync, writeFileSync } from '@withtypes/fs-extra'
import { resolve } from 'path'
import { generateDtsBundle } from 'dts-bundle-generator'
import type { BuildOptions } from './types'

/**
 * Generate declaration file of library
 */
export async function buildTypes({ name, rootPath }: BuildOptions) {
  const filePath = resolve(rootPath, `./packages/${name}/src/index.ts`)
  const options = [
    {
      filePath,
      output: {
        noBanner: true,
      },
    },
  ]

  const dtses = generateDtsBundle(options, {
    preferredConfigPath: resolve(rootPath, `./tsconfig.json`),
  })
  if (!Array.isArray(dtses) || !dtses.length) return

  const outDir = resolve(rootPath, `./packages/${name}/types`)
  !existsSync(outDir) && mkdirpSync(outDir)

  const dts = dtses[0]
  const output = resolve(outDir, `./index.d.ts`)
  writeFileSync(output, dts)
}
