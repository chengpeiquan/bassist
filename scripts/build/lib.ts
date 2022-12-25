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
  const deps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]

  return {
    build: {
      outDir,
      lib: {
        entry: resolve(basePath, './src/index.ts'),
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
        content: [
          `/**`,
          ` * name: ${pkg.name}`,
          ` * version: v${pkg.version}`,
          ` * description: ${pkg.description}`,
          ` * author: ${pkg.author}`,
          ` * homepage: ${pkg.homepage}`,
          ` * license: ${pkg.license}`,
          ` */`,
        ].join('\n'),
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
