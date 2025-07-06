import { createBaseConfig } from '@packages/build-config/src/tsup'
import { defineConfig } from 'tsup'
import pkg from './package.json'

const config = createBaseConfig({
  pkg,
  entry: {
    index: 'src/index.ts',
    'prettier-config': 'src/shared/prettier-config.mjs',
  },
})

export default defineConfig(config)
