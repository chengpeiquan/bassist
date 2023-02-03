import { describe, expect, it } from 'vitest'
import { getDirnameInEsModule } from '..'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

describe('path', () => {
  it('getDirnameInEsModule', () => {
    expect(getDirnameInEsModule(import.meta.url).includes('test')).toBeTruthy()

    expect(getDirnameInEsModule(import.meta.url)).toBe(
      dirname(fileURLToPath(import.meta.url))
    )

    expect(getDirnameInEsModule(import.meta.url)).toBe(__dirname)
  })
})
