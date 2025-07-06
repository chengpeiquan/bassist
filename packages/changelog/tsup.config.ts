import { createBaseConfig } from '@packages/build-config/src/tsup'
import { defineConfig } from 'tsup'
import pkg from './package.json'

const config = createBaseConfig({ pkg })

export default defineConfig(config)
