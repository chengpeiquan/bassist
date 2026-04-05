import { defineConfig } from 'tsdown'
import { BundleFormat, createTsdownConfig } from '../../scripts/build-config.ts'

const config = createTsdownConfig(import.meta.url, {
  format: [BundleFormat.ESM, BundleFormat.CJS, BundleFormat.IIFE],
})

export default defineConfig(config)
