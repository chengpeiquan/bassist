export * from './configs/imports'
export * from './configs/javascript'
export * from './configs/jsx'
export * from './configs/markdown'
export * from './configs/next'
export * from './configs/node'
export * from './configs/react'
export * from './configs/regexp'
export * from './configs/typescript'
export * from './configs/unicorn'
export * from './configs/vue'

export * from './define'

export {
  prettierPlugin,
  type PrettierParser,
  type PrettierOptions,
  type PartialPrettierExtendedOptions,
} from './private-configs/prettier'

export {
  tailwindcssPlugin,
  defaultTailwindcssSettings,
  type TailwindcssSettings,
} from './private-configs/tailwindcss'

export { createGetConfigNameFactory } from './shared'
