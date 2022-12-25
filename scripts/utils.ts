import {
  copyFileSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmdirSync,
  statSync,
  unlinkSync,
} from '@withtypes/fs-extra'
import { resolve } from 'path'

/**
 * Get argv from Command Line
 */
export function getArgv() {
  const argv = process.argv
  if (argv.length < 3) {
    throw new Error(
      `Missing package name to generate declaration files.\ne.g. pnpm build utils\n\n`
    )
  }
  const [, , name, code] = argv
  return { name, code }
}

/**
 * Parse package.json
 * @param path - The path where the `package.json` file is located
 */
export function parsePackage(path: string): { [key: string]: any } {
  try {
    const pkgPath = path.endsWith('package.json')
      ? resolve(path)
      : resolve(path, 'package.json')
    const pkgStringify = readFileSync(pkgPath, 'utf-8')
    const pkg = JSON.parse(pkgStringify)
    return pkg
  } catch (e) {
    return {}
  }
}

/**
 * Remove file or directory
 * @param type - Remove type, support `file` and `dir`
 * @param target - The target to be remove, a file or a directory
 */
export function remove(type: string, target: string): void {
  try {
    switch (type) {
      case 'file':
        unlinkSync(target)
        break
      case 'dir':
        rmdirSync(target)
        break
    }
  } catch (e) {
    // console.log(e)
  }
}

/**
 * Copy a file or a directory
 * @param src - The source file or directory
 * @param dest - The target file or directory
 */
export function copy(src: string, dest: string): void {
  const stat = statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    copyFileSync(src, dest)
  }
}

/**
 * Copy directory
 * @param srcDir - The source directory
 * @param destDir - The target directory
 */
export function copyDir(srcDir: string, destDir: string): void {
  mkdirSync(destDir, {
    recursive: true,
  })

  for (const file of readdirSync(srcDir)) {
    const srcFile = resolve(srcDir, file)
    const destFile = resolve(destDir, file)
    copy(srcFile, destFile)
  }
}
