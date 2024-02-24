import { resolve } from 'path'
import { build } from 'tsup'
import { TsupFormat } from '..'
import { capitalize, getBanner, getDeps } from '@scripts/build/utils'
import { parsePackage } from '@scripts/utils'
import type { Options } from 'tsup'
import type { BuildOptions } from '@scripts/build/types'

type GetEntryOptions = Pick<BuildOptions, 'name' | 'entryFile' | 'entryFiles'>

function getEntry({ name, entryFile, entryFiles }: GetEntryOptions) {
  const basePath = `packages/${name}/src`

  if (Array.isArray(entryFiles)) {
    return entryFiles.map((i) => `${basePath}/${i}`)
  }

  const fileName = entryFile ?? 'index.ts'
  return [`${basePath}/${fileName}`]
}

function getJsFormat(format: TsupFormat) {
  switch (format) {
    case TsupFormat.CJS: {
      return '.cjs'
    }
    case TsupFormat.ESM: {
      return '.mjs'
    }
    default: {
      return '.min.js'
    }
  }
}

// https://tsup.egoist.dev
export async function buildByTsup({
  name,
  bin,
  entryFile,
  entryFiles,
}: BuildOptions) {
  const basePath = resolve(process.cwd(), `./packages/${name}`)
  const outDir = resolve(basePath, `./dist`)
  const entry = getEntry({ name, entryFile, entryFiles })
  const pkg = parsePackage(basePath)
  const banner = getBanner(pkg, { bin })
  const external = getDeps(pkg)

  console.log({ entry })
  console.log()

  const config: Options = {
    entry,
    outDir,
    platform: 'node',
    target: ['es2020'],
    format: [TsupFormat.CJS, TsupFormat.ESM, TsupFormat.IIFE],
    dts: true,
    external,
    outExtension({ format }) {
      return {
        js: getJsFormat(format as TsupFormat),
      }
    },
    globalName: capitalize(name),
    banner: {
      js: banner,
      css: banner,
    },
    bundle: true,
    minify: true,
    clean: true,
  }

  await build(config)
}
