import { resolve } from 'path'
import { build } from 'tsup'
import { BundleFormat } from './types'
import { pascalCase, getBanner, getDeps } from '@scripts/build/utils'
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

function getJsFormat(format: BundleFormat) {
  switch (format) {
    case BundleFormat.CJS: {
      return '.cjs'
    }
    case BundleFormat.ESM: {
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
  formats,
}: BuildOptions) {
  const basePath = resolve(process.cwd(), `./packages/${name}`)
  const outDir = resolve(basePath, `./dist`)
  const entry = getEntry({ name, entryFile, entryFiles })
  const pkg = parsePackage(basePath)
  const banner = getBanner(pkg, { bin })
  const external = getDeps(pkg)
  const format = Array.isArray(formats)
    ? formats
    : [BundleFormat.CJS, BundleFormat.ESM, BundleFormat.IIFE]

  console.log({ entry })
  console.log()

  const config: Options = {
    entry,
    outDir,
    platform: 'node',
    target: ['es2020'],
    format,
    dts: true,
    external,
    outExtension({ format }) {
      return {
        js: getJsFormat(format as BundleFormat),
      }
    },
    globalName: pascalCase(name),
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
