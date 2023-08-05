import {
  mergeConfigs,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export type Config = ReturnType<typeof mergeConfigs>

export function defineConfig(configs: Config | Config[] = []): Config {
  return mergeConfigs([
    {
      presets: [
        /**
         * This preset attempts to provide a common superset
         * of the popular utility-first frameworks,
         * including Tailwind CSS, Windi CSS, Bootstrap, Tachyons, etc.
         *
         * @see https://unocss.dev/presets/uno
         */
        presetUno(),

        /**
         * This enables the attributify mode for other presets.
         *
         * @see https://unocss.dev/presets/attributify
         */
        presetAttributify(),

        /**
         * Provides a set of prose classes
         * you can use to add typographic defaults to vanilla HTML.
         *
         * @see https://unocss.dev/presets/typography
         */
        presetTypography(),
      ],
      transformers: [
        /**
         * You can use a combination of directives and CSS to take advantage of the available utilities.
         *
         * @see https://unocss.dev/transformers/directives
         */
        transformerDirectives({
          applyVariable: ['--at-apply', '--uno-apply', '--uno'],
        }),

        /**
         * Apply utilities for the same variant by grouping them with a parenthesis.
         *
         * @see https://unocss.dev/transformers/variant-group
         */
        transformerVariantGroup(),
      ],
      exclude: ['node_modules'],
    },
    ...(Array.isArray(configs) ? configs : [configs]),
  ])
}
