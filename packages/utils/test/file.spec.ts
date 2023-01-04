import mime from '@withtypes/mime'
import { describe, expect, it } from 'vitest'
import { FileInfo } from '..'

const file = new FileInfo(mime)

describe('file', () => {
  it('getMimeType', () => {
    expect(file.getMimeType('example.txt')).toBe('text/plain')
    expect(file.getMimeType('example.png')).toBe('image/png')
    expect(file.getMimeType('example')).toBe('')
    expect(
      file.getMimeType(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACrElEQVR4'
      )
    ).toBe('image/png')
  })

  it('getExtensionFromMimeType', () => {
    expect(file.getExtensionFromMimeType('text/plain')).toBe('txt')
  })

  it('getExtension', () => {
    expect(file.getExtension('example.txt')).toBe('txt')
    expect(file.getExtension('example.png')).toBe('png')
    expect(file.getExtension('example')).toBe('')
    expect(
      file.getExtension(
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACrElEQVR4'
      )
    ).toBe('png')
  })
})
