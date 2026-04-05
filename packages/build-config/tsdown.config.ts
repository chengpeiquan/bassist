import { defineConfig } from 'tsdown'
import { createTsdownConfig } from '../../scripts/build-config.ts'

const config = createTsdownConfig(import.meta.url, {
  entry: {
    tsdown: 'src/tsdown.ts',
    tsup: 'src/tsup.ts',
  },
})

export default defineConfig(config)
