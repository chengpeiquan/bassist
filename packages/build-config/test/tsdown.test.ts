import { describe, expect, test } from 'vitest'
import { createTsdownConfig } from '../../../scripts/build-config.ts'
import pkg from '../package.json'
import { BundleFormat, createBaseConfig } from '../src/tsdown'

describe('@bassist/build-config/tsdown', () => {
  test('creates a tsdown config with default formats', () => {
    const config = createBaseConfig({ pkg })

    expect(config).toBeDefined()
    expect(config.format).toEqual([BundleFormat.CJS, BundleFormat.ESM])
    expect(config.dts).toBe(true)
    expect(config.clean).toBe(true)
  })

  test('sets a default global name for iife builds', () => {
    const config = createBaseConfig({
      pkg,
      format: [BundleFormat.IIFE],
    })

    expect(config.globalName).toBe('bassistBuildConfig')
  })

  test('creates a package-aware config from a ts helper without jiti', () => {
    const config = createTsdownConfig(
      new URL('../tsdown.config.ts', import.meta.url),
    )

    expect(config).toBeDefined()
    expect(config.format).toEqual([BundleFormat.CJS, BundleFormat.ESM])
    expect(config.outDir).toBe('dist')
  })
})
