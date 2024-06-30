import { resolve } from 'node:path'
import { existsSync } from 'node:fs'
import { readJsonSync } from 'fs-extra/esm'

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

interface GetBannerOptions {
  bin?: boolean
}

export function getBanner(
  pkg: Record<string, any>,
  { bin }: GetBannerOptions = {},
) {
  const baseBanners = [
    `/**`,
    ` * name: ${pkg.name}`,
    ` * version: v${pkg.version}`,
    ` * description: ${pkg.description}`,
    ` * author: ${pkg.author}`,
    ` * homepage: ${pkg.homepage}`,
    ` * license: ${pkg.license}`,
    ` */`,
  ]

  const banners = bin
    ? ['#!/usr/bin/env node', '', ...baseBanners]
    : baseBanners

  return banners.join('\n')
}

export function getDeps(pkg: Record<string, any>) {
  return [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ]
}

export function capitalize([first, ...rest]: string) {
  if (!first) return ''
  return first.toUpperCase() + rest.join('')
}

export function camelCase([first, ...rest]: string) {
  if (!first) return ''
  const word = first.toLowerCase() + rest.join('')
  return word.replace(/[-_](\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

export function pascalCase(word: string) {
  if (!word) return ''
  return capitalize(camelCase(word))
}
