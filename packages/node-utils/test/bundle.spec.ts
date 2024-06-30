import { describe, expect, it } from 'vitest'
import { getBundleBanner } from '..'
import pkg from '../package.json'

describe('bundler', () => {
  it('getBundleBanner base', () => {
    expect(getBundleBanner(pkg)).toBe(
      [
        `/**`,
        ` * name: ${pkg.name}`,
        ` * version: v${pkg.version}`,
        ` * description: ${pkg.description}`,
        ` * author: ${pkg.author}`,
        ` * homepage: ${pkg.homepage}`,
        ` * license: ${pkg.license}`,
        ` */`,
      ].join('\n'),
    )
  })

  it('getBundleBanner bin', () => {
    expect(getBundleBanner(pkg, { bin: true })).toBe(
      [
        '#!/usr/bin/env node',
        '',
        `/**`,
        ` * name: ${pkg.name}`,
        ` * version: v${pkg.version}`,
        ` * description: ${pkg.description}`,
        ` * author: ${pkg.author}`,
        ` * homepage: ${pkg.homepage}`,
        ` * license: ${pkg.license}`,
        ` */`,
      ].join('\n'),
    )
  })

  it('getBundleBanner custom fields', () => {
    expect(getBundleBanner(pkg, { fields: ['name', 'version'] })).toBe(
      [
        `/**`,
        ` * name: ${pkg.name}`,
        ` * version: v${pkg.version}`,
        ` */`,
      ].join('\n'),
    )
  })

  it('getBundleBanner bad fields', () => {
    expect(
      getBundleBanner(pkg, { fields: ['foo', 'bar', 'dependencies'] }),
    ).toBe([`/**`, ` */`].join('\n'))
  })
})
