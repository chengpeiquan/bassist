import {
  defineConfig as defineNativeOxlintConfig,
  type OxlintConfig,
} from 'oxlint'

export const defineOxlintConfig = (...items: OxlintConfig[]): OxlintConfig =>
  defineNativeOxlintConfig(
    items.reduce<OxlintConfig>(
      (acc, item) => ({
        ...acc,
        ...item,
        plugins: [
          ...new Set([...(acc.plugins ?? []), ...(item.plugins ?? [])]),
        ],
        rules: { ...(acc.rules ?? {}), ...(item.rules ?? {}) },
        categories: { ...(acc.categories ?? {}), ...(item.categories ?? {}) },
        env: { ...(acc.env ?? {}), ...(item.env ?? {}) },
        globals: { ...(acc.globals ?? {}), ...(item.globals ?? {}) },
        settings: { ...(acc.settings ?? {}), ...(item.settings ?? {}) },
        ignorePatterns: [
          ...new Set([
            ...(acc.ignorePatterns ?? []),
            ...(item.ignorePatterns ?? []),
          ]),
        ],
      }),
      {},
    ),
  )
