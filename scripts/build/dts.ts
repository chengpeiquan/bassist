import { writeFileSync } from '@withtypes/fs-extra'
import { resolve } from 'path'
import { generateDtsBundle } from 'dts-bundle-generator'
import type { BuildOptions } from './types'

/**
 * Generate declaration file of library
 */
export async function buildTypes({ name, rootPath }: BuildOptions) {
  const filePath = resolve(rootPath, `./packages/${name}/src/index.ts`)
  console.log('filePath', filePath);
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

  const dts = dtses[0]
  const output = resolve(rootPath, `./packages/${name}/types/index.d.ts`)
  writeFileSync(output, dts)
}
