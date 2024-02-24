import { resolve } from 'path'
import { build } from 'vite'
import banner from 'vite-plugin-banner'
import { parsePackage } from '@scripts/utils'
import { capitalize, getBanner, getDeps } from '@scripts/build/utils'
import { ViteFormat } from '..'
import type { UserConfig } from 'vite'
import type { BuildOptions } from '@scripts/build/types'

/**
 * Build options provided to `vite.config.ts`
 *
 * @see https://vitejs.dev/config/
 */
function viteConfig({ name, bin, entryFile }: BuildOptions): UserConfig {
  const basePath = resolve(process.cwd(), `./packages/${name}`)
  const outDir = resolve(basePath, `./dist`)
  const pkg = parsePackage(basePath)
  const bannerContent = getBanner(pkg, { bin })
  const deps = getDeps(pkg)

  const config: UserConfig = {
    build: {
      outDir,
      lib: {
        entry: resolve(basePath, `./src/${entryFile ?? 'index.ts'}`),
        name: capitalize(name),
        formats: [ViteFormat.UMD, ViteFormat.CJS, ViteFormat.ESM],
        fileName: (format) => {
          switch (format) {
            case ViteFormat.UMD:
              return 'index.min.js'
            case ViteFormat.CJS:
              return 'index.cjs'
            case ViteFormat.ESM:
              return 'index.mjs'
            default:
              return 'index.js'
          }
        },
      },
      minify: true,
      sourcemap: false,
      rollupOptions: {
        external: deps,
        output: {
          globals: (name) => capitalize(name),
        },
      },
    },
    resolve: {
      dedupe: deps,
    },
    plugins: [
      banner({
        content: bannerContent,
        outDir,
        debug: true,
      }),
    ],
  }

  return config
}

/**
 * Output bundle files of library
 */
export async function buildLibrary(options: BuildOptions) {
  const config: UserConfig = viteConfig(options)
  await build(config)
}
