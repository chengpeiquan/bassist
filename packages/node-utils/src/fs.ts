import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  rmdirSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from '@withtypes/fs-extra'
import { resolve } from 'path'

/**
 * Write file content
 * @param file - The full path of the target file
 * @param content - The content of the file to be written
 *
 * @category fs
 */
export function write(file: string, content: string) {
  if (content) {
    writeFileSync(file, content)
  }
}

/**
 * Remove file or directory
 *
 * @category fs
 */
export function remove(fullPath: string) {
  try {
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      emptyDir(fullPath)
      rmdirSync(fullPath)
    } else {
      unlinkSync(fullPath)
    }
  } catch (e) {
    // console.log(e)
  }
}

/**
 * Copy a file or a directory
 * @param src - The full path to the source file or directory
 * @param dest - The full path to the target file or directory
 *
 * @category fs
 */
export function copy(src: string, dest: string) {
  const stat = statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    copyFileSync(src, dest)
  }
}

/**
 * Copy directory
 * @param srcDir - The source directory full path
 * @param destDir - The target directory full path
 *
 * @category fs
 */
export function copyDir(srcDir: string, destDir: string) {
  try {
    mkdirSync(destDir, {
      recursive: true,
    })

    for (const file of readdirSync(srcDir)) {
      const srcFile = resolve(srcDir, file)
      const destFile = resolve(destDir, file)
      copy(srcFile, destFile)
    }
  } catch (e) {
    // console.log(e)
  }
}

/**
 * Check the directory is empty
 *
 * @category fs
 */
export function isEmpty(fullPath: string) {
  return readdirSync(fullPath).length === 0
}

/**
 * Empty the target directory
 *
 * @category fs
 */
export function emptyDir(fullPath: string) {
  if (!existsSync(fullPath)) return
  try {
    for (const file of readdirSync(fullPath)) {
      const abs = resolve(fullPath, file)
      if (lstatSync(abs).isDirectory()) {
        emptyDir(abs)
        rmdirSync(abs)
      } else {
        unlinkSync(abs)
      }
    }
  } catch (e) {
    // console.log(e)
  }
}
