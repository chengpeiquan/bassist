import {
  defineFlatConfig,
  imports,
  javascript,
  typescript,
} from '../../../dist/index.mjs'

export default defineFlatConfig([...imports, ...javascript, ...typescript], {
  prettierEnabled: false,
  tailwindcssEnabled: false,
})
