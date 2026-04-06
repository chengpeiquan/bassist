import {
  defineConfig as defineNativeOxfmtConfig,
  type OxfmtConfig,
} from 'oxfmt'
import { defaultOxfmtConfig } from './defaults'

export const getOxfmtConfig = (
  overrides: Partial<OxfmtConfig> = {},
): OxfmtConfig =>
  defineNativeOxfmtConfig({
    ...defaultOxfmtConfig,
    ...overrides,
  })

export const oxfmtConfig: OxfmtConfig = getOxfmtConfig()
