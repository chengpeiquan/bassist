import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'
import {
  defineEslintConfig,
  defineOxlintConfig,
  eslintPresets,
  getOxfmtConfig,
  oxfmtConfig,
  oxlintPresets,
} from '../src'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

describe('@bassist/oxc-integration', () => {
  test('creates mergeable Oxlint presets', () => {
    const config = defineOxlintConfig(
      oxlintPresets.base(),
      oxlintPresets.react(),
      {
        rules: {
          'no-console': 'warn',
          'typescript/array-type': ['error', { default: 'array' }],
        },
      },
    )

    expect(config.plugins).toContain('react')
    expect(config.categories?.correctness).toBe('error')
    expect(config.rules?.['no-console']).toBe('warn')
    expect(config.rules?.['max-lines-per-function']).toBe('off')
    expect(config.rules?.['no-inline-comments']).toBe('off')
    expect(config.rules?.['require-await']).toBe('off')
    expect(config.rules?.['typescript/ban-ts-comment']).toBe('off')
    expect(config.rules?.['typescript/array-type']).toEqual([
      'error',
      { default: 'array' },
    ])
  })

  test('returns Oxfmt defaults with overrides', () => {
    expect(oxfmtConfig.singleQuote).toBe(true)
    expect(oxfmtConfig.trailingComma).toBe('all')

    const overridden = getOxfmtConfig({ semi: true, trailingComma: 'es5' })

    expect(overridden.semi).toBe(true)
    expect(overridden.trailingComma).toBe('es5')
  })

  test('exports fallback presets with oxlint dedupe', () => {
    const reactConfig = defineEslintConfig(eslintPresets.react())
    const jsoncConfig = defineEslintConfig(eslintPresets.jsonc())
    const markdownConfig = defineEslintConfig(eslintPresets.markdown())
    const tailwindConfig = defineEslintConfig(
      eslintPresets.tailwindcss({
        config: './configs/tailwind.config.js',
      }),
    )
    const vueConfig = defineEslintConfig(eslintPresets.vue())
    const importsConfig = defineEslintConfig(eslintPresets.imports())
    const nextConfig = defineEslintConfig(eslintPresets.next())
    const vitestConfig = defineEslintConfig(eslintPresets.vitest())

    expect(
      reactConfig.some((item) => item.name?.includes('oxlint/react')),
    ).toBe(true)
    expect(vueConfig.some((item) => item.name?.includes('oxlint/vue'))).toBe(
      true,
    )
    expect(
      importsConfig.some((item) => item.name?.includes('oxlint/import')),
    ).toBe(true)
    expect(
      nextConfig.some((item) => item.name?.includes('oxlint/nextjs')),
    ).toBe(true)
    expect(
      vitestConfig.some((item) => item.name?.includes('oxlint/vitest')),
    ).toBe(true)
    expect(
      vitestConfig.some((item) => item.name?.includes('vitest/recommended')),
    ).toBe(true)
    expect(jsoncConfig.some((item) => item.name?.includes('jsonc'))).toBe(true)
    expect(jsoncConfig.some((item) => item.name?.includes('prettier'))).toBe(
      false,
    )
    expect(
      markdownConfig.some((item) => item.language === 'markdown/commonmark'),
    ).toBe(true)
    expect(markdownConfig.some((item) => item.name?.includes('prettier'))).toBe(
      false,
    )
    expect(
      tailwindConfig.some((item) => item.name === 'tailwindcss:base'),
    ).toBe(true)
    expect(
      tailwindConfig.some((item) => item.name === 'tailwindcss:rules'),
    ).toBe(true)
    expect(
      tailwindConfig.some(
        (item) =>
          item.name === 'bassist/tailwindcss/settings' &&
          item.settings?.tailwindcss?.config === './configs/tailwind.config.js',
      ),
    ).toBe(true)
  })

  test('README explains workflow and fallback coverage', () => {
    const readme = readFileSync(resolve(packageRoot, 'README.md'), 'utf8')

    expect(readme).toContain('How It Works')
    expect(readme).toContain('Built-in Fallback Coverage')
    expect(readme).toContain('javascript')
    expect(readme).toContain('typescript')
    expect(readme).toContain('jsx')
    expect(readme).toContain('imports')
    expect(readme).toContain('jsonc')
    expect(readme).toContain('markdown')
    expect(readme).toContain('react')
    expect(readme).toContain('tailwindcss')
    expect(readme).toContain('vue')
    expect(readme).toContain('next')
    expect(readme).toContain('vitest')
  })

  test('README.zh-CN explains workflow and fallback coverage', () => {
    const readme = readFileSync(resolve(packageRoot, 'README.zh-CN.md'), 'utf8')

    expect(readme).toContain('工作方式')
    expect(readme).toContain('内建的 Fallback Coverage')
    expect(readme).toContain('javascript')
    expect(readme).toContain('typescript')
    expect(readme).toContain('jsx')
    expect(readme).toContain('imports')
    expect(readme).toContain('jsonc')
    expect(readme).toContain('markdown')
    expect(readme).toContain('react')
    expect(readme).toContain('tailwindcss')
    expect(readme).toContain('vue')
    expect(readme).toContain('next')
    expect(readme).toContain('vitest')
    expect(readme).toContain('oxfmt.config.ts')
    expect(readme).toContain('ESLint fallback')
  })
})
