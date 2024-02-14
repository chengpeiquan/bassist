# @bassist/uno

<p>
  <a href='https://www.npmjs.com/package/@bassist/uno'>
    <img src="https://img.shields.io/npm/v/@bassist/uno?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/uno" target="__blank">
    <img src="https://img.shields.io/npm/dt/@bassist/uno?color=f43f5e&label=downloads" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist/tree/main/packages/uno" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

Custom configuration for [UnoCSS](https://unocss.dev/) by [@chengpeiquan](https://github.com/chengpeiquan) .

## Usage

With npm(or yarn, or pnpm):

```bash
npm install -D unocss @bassist/uno
```

Yeah, this is a UnoCSS configuration, so you need to install UnoCSS at the same time.

## Configuration

Create a configuration file named `uno.config.ts` (or `.js` ) in the root path of the project.

```ts
// uno.config.ts
import { defineConfig } from '@bassist/uno'

export default defineConfig()
```

See: [Integrations](https://unocss.dev/integrations/) to integrate UnoCSS into your frameworks.

## Overwrite

You can overwrite or merge your custom configuration.

e.g. Specify a theme color as a Hex value.

```ts
// uno.config.ts
import { defineConfig } from '@bassist/uno'

export default defineConfig({
  theme: {
    colors: {
      primary: '#065f46',
    },
  },
})
```

e.g. Specify a theme color as a CSS Variable.

```ts
// uno.config.ts
import { defineConfig } from '@bassist/uno'

export default defineConfig({
  theme: {
    colors: {
      primary: 'var(--c-primary)',
    },
  },
})
```

e.g. Specify a theme color as a set of color palettes.

```ts
// uno.config.ts
import { defineConfig } from '@bassist/uno'

export default defineConfig({
  theme: {
    colors: {
      primary: {
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
        DEFAULT: '#065f46',
      },
    },
  },
})
```

For more configuration, please refer to the documentation.

## Documentation

Based on the preset foundation of [Tailwind CSS](https://tailwindcss.com) and [Windi CSS](https://windicss.org) , some commonly used default configurations are built in, you can refer to their documentation for detailed usage.

What are the commonly used default configurations? See: [Source Code](https://github.com/chengpeiquan/bassist/tree/main/packages/uno/src/index.ts) .

## VS Code Extension

See: [VS Code Extension](https://unocss.dev/integrations/vscode)

## Release Notes

Please refer to [CHANGELOG](https://github.com/chengpeiquan/bassist/blob/main/packages/uno/CHANGELOG.md) for details.

## License

MIT License © 2023-PRESENT [chengpeiquan](https://github.com/chengpeiquan)
