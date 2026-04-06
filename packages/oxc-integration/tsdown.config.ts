import { defineConfig } from 'tsdown'
import { createTsdownConfig } from '../../scripts/build-config.ts'

const config = createTsdownConfig(import.meta.url)

export default defineConfig(config)
