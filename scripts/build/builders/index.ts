export * from './vite'
export * from './tsup'

export enum Builder {
  Vite = 'vite',
  Tsup = 'tsup',
}

export enum ViteFormat {
  CJS = 'cjs',
  ESM = 'es',
  IIFE = 'iife',
  UMD = 'umd',
}

export enum TsupFormat {
  CJS = 'cjs',
  ESM = 'esm',
  IIFE = 'iife',
}
