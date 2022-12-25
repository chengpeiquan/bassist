import { describe, expect, it } from 'vitest'
import { getMimeType, getExtensionFromMimeType, getExtension } from '..'

describe('query', () => {
  it('getMimeType', () => {
    expect(getMimeType('example.txt')).toBe('text/plain')
    expect(getMimeType('example.png')).toBe('image/png')
    expect(getMimeType('example')).toBe('')
    expect(
      getMimeType(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACrElEQVR4'
      )
    ).toBe('image/png')
  })

  it('getExtensionFromMimeType', () => {
    expect(getExtensionFromMimeType('text/plain')).toBe('txt')
  })

  it('getExtension', () => {
    expect(getExtension('example.txt')).toBe('txt')
    expect(getExtension('example.png')).toBe('png')
    expect(getExtension('example')).toBe('')
    expect(
      getExtension(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACrElEQVR4'
      )
    ).toBe('png')
  })
})
