import { defineConfig } from 'tsdown'
import { createTsdownConfig } from '../../scripts/build-config.ts'

const config = createTsdownConfig(import.meta.url, {
  entry: {
    index: 'src/index.ts',
    'prettier-config': 'src/shared/prettier-config.mjs',
  },
})

export default defineConfig(config)
