import { resolve } from 'path'
import { existsSync, readJsonSync } from '@withtypes/fs-extra'

export function readBuildConfig(name: string) {
  const buildConfigFile = resolve(
    process.cwd(),
    `./packages/${name}/.build/config.json`,
  )
  if (existsSync(buildConfigFile)) {
    const buildConfig = readJsonSync(buildConfigFile)
    return buildConfig
  }
  return {}
}

export function getBanner(pkg: Record<string, any>) {
  return [
    `/**`,
    ` * name: ${pkg.name}`,
    ` * version: v${pkg.version}`,
    ` * description: ${pkg.description}`,
    ` * author: ${pkg.author}`,
    ` * homepage: ${pkg.homepage}`,
    ` * license: ${pkg.license}`,
    ` */`,
  ].join('\n')
}

export function getDeps(pkg: Record<string, any>) {
  return [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]
}