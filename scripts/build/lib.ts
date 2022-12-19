import { resolve } from 'path'
import { build, UserConfig } from 'vite'
import banner from 'vite-plugin-banner'
import { capitalize, parsePackage } from '../utils'
import type { BuildOptions } from './types'

/**
 * Build options provided to `vite.config.ts`
 * @see https://vitejs.dev/config/
 */
function viteConfig({ name, rootPath }: BuildOptions): UserConfig {
  const basePath = resolve(rootPath, `./packages/${name}`)
  const outDir = resolve(basePath, `./lib`)
  const pkg = parsePackage(basePath)

  return {
    build: {
      outDir,
      lib: {
        entry: resolve(basePath, './index.ts'),
        name: capitalize(name),
        formats: ['umd', 'cjs', 'es'],
        fileName: (format) => {
          switch (format) {
            case 'umd':
              return 'index.min.js'
            case 'cjs':
              return 'index.cjs'
            case 'es':
              return 'index.mjs'
            default:
              return 'index.js'
          }
        },
      },
      minify: true,
      sourcemap: false,
      rollupOptions: {
        external: Object.keys(pkg.dependencies),
        output: {
          globals: (name) => capitalize(name),
        },
      },
    },
    resolve: {
      dedupe: Object.keys(pkg.dependencies),
    },
    plugins: [
      banner({
        content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`,
        outDir,
        debug: true,
      }),
    ],
  }
}

/**
 * Output bundle files of library
 */
export async function buildLibrary(options: BuildOptions) {
  const config: UserConfig = viteConfig(options)
  await build(config)
}
