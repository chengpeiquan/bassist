import { BundleFormat, createBaseConfig } from '@packages/build-config/src/tsup'
import { defineConfig } from 'tsup'
import pkg from './package.json'

const config = createBaseConfig({
  pkg,
  format: [BundleFormat.ESM, BundleFormat.CJS, BundleFormat.IIFE],
})

export default defineConfig(config)
