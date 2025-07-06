import { defineConfig } from 'tsup'
import pkg from './package.json'
import { createBaseConfig } from './src/tsup'

const config = createBaseConfig({
  pkg,
  entry: {
    tsup: 'src/tsup.ts',
  },
})

export default defineConfig(config)
