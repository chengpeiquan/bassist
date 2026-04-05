import { defineConfig } from 'tsdown'
import { BundleFormat, createTsdownConfig } from '../../scripts/build-config.ts'

const config = createTsdownConfig(import.meta.url, {
  format: {
    [BundleFormat.ESM]: {},
    [BundleFormat.CJS]: {},
    [BundleFormat.IIFE]: {
      globalName: 'bassistProgress',
      outputOptions: {
        globals: {
          '@bassist/utils': 'bassistUtils',
          nprogress: 'NProgress',
          'nprogress/nprogress.css?inline': 'NProgressCssInline',
        },
      },
    },
  },
})

export default defineConfig(config)
