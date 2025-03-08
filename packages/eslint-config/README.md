# @bassist/eslint-config

<p>
  <a href='https://www.npmjs.com/package/@bassist/eslint-config'>
    <img src="https://img.shields.io/npm/v/@bassist/eslint-config?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/eslint-config" target="__blank">
    <img src="https://img.shields.io/npm/dy/@bassist/eslint-config?color=f43f5e&label=downloads" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist/tree/main/packages/eslint-config" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

A modern flat ESLint configuration for [ESLint](https://eslint.org/), crafted by [@chengpeiquan](https://github.com/chengpeiquan).

## ⚡ Usage

Using this ESLint configuration only requires three steps:

1. Install dependencies (See: [🚀 Installation](#-installation))
2. Add ESLint configuration file (See: [📂 Configuration File](#-configuration-file))
3. Enable automatic Lint for VS Code settings.json (See: [🛠 VS Code Setup](#-vs-code-setup))

This quick guide helps you get up and running without missing key steps 🚀 .

## 🚀 Installation

Install the package with your favorite package manager:

```bash
npm install -D eslint @bassist/eslint-config
```

**Note:** Requires ESLint >= `9.0.0` , and TypeScript >= `5.0.0` .

> For ESLint v8 users, refer to the legacy (unmaintained) package: [@bassist/eslint](https://www.npmjs.com/package/@bassist/eslint).

## 📂 Configuration File

Create an `eslint.config.js` file at the project root:

```js
// eslint.config.js
import { markdown, typescript } from '@bassist/eslint-config'

// export an array of configuration objects
export default [...markdown, ...typescript]
```

Then add `"type": "module"` to your `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "lint": "eslint src",
    "lint:inspector": "npx @eslint/config-inspector --config eslint.config.ts"
  }
}
```

Run `npm run lint` to lint your code, or `npm run lint:inspector` to visualize your ESLint config at [localhost:7777](http://localhost:7777/).

> For typescript file type (e.g. `eslint.config.ts` ), requires [additional setup](https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files) .

```bash
# Runtime typescript and ESM support for Node.js
npm install -D jiti
```

## ✅ Type-Safe Config

For enhanced type safety, use `defineFlatConfig`:

```js
// @ts-check
import { defineFlatConfig, prettier, vue } from '@bassist/eslint-config'

export default defineFlatConfig([
  ...prettier,
  ...vue,
  // Add more custom configurations
  {
    // Provide a name for each configuration so that
    // it can be clearly displayed in the visualizer
    // when running `npm run lint:inspector`.
    name: 'my-custom-rule/vue',
    rules: {
      // e.g. By default, this rule is `off`
      'vue/component-tags-order': 'error',
    },
    ignores: ['examples'],
  },
])
```

## 🛠 VS Code Setup

Enable automatic linting and fixing in VS Code by adding the following to your workspace settings:

```json
{
  "editor.formatOnSave": true,
  "eslint.useFlatConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always",
    "source.fixAll.prettier": "always"
  }
}
```

## 📘 API Reference

### defineFlatConfig

Define ESLint configurations with optional Prettier and Tailwind CSS integration.

The API type declaration:

```ts
/**
 * Define the ESLint configuration with optional Prettier integration.
 *
 * @param configs The base ESLint configurations.
 * @param options - Options for defining the configuration.
 *
 * @returns The final ESLint configuration array.
 */
declare const defineFlatConfig: (
  configs: FlatESLintConfig[],
  options?: DefineFlatConfigOptions,
) => FlatESLintConfig[]
```

The options type declaration:

```ts
interface DefineFlatConfigOptions {
  /**
   * Specifies the working directory for loading the `.prettierrc`
   * configuration.
   *
   * The config file should be in JSON format.
   *
   * @default process.cwd()
   */
  cwd?: string

  /**
   * If `prettierEnabled` is set to `false`, all Prettier-related rules and
   * configurations will be ignored, even if `prettierRules` are provided.
   *
   * @default true
   */
  prettierEnabled?: boolean

  /**
   * By default, this will read `.prettierrc` from the current working
   * directory, and the `.prettierrc` file must be written in JSON format.
   *
   * If you are not using a config file with JSON content, or a different config
   * file name, you can convert it to JSON rules and pass it in.
   *
   * After reading the custom configuration, it will be merged with the default
   * ESLint rules.
   *
   * @see https://prettier.io/docs/configuration.html
   */
  prettierRules?: PartialPrettierExtendedOptions

  /**
   * Tailwindcss rules are enabled by default. If they interfere with your
   * project, you can disable them with this option.
   *
   * @default true
   */
  tailwindcssEnabled?: boolean

  /**
   * If you need to override the configuration, you can pass the corresponding
   * options.
   *
   * If you want to merge configurations, you can import
   * `defaultTailwindcssSettings`, merge them yourself, and then pass the result
   * in.
   *
   * If an empty object `{}` is passed, the default settings will be used.
   */
  tailwindcssSettings?: TailwindcssSettings
}
```

### Exported Configurations

These are mainly the ones I use frequently. If you need any additions, welcome PR!

#### Languages

- [JavaScript](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/javascript.ts)
- [TypeScript](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/typescript.ts)
- [JSX](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/jsx.ts)
- [Markdown](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/markdown.ts)

#### Frameworks

- [Next.js](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/next.ts)
- [React](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/react.ts)
- [Vue (v2 and v3)](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/vue.ts)

#### Formatters

Formatting rules are enabled by default and not exported externally. Please pass custom configuration via `options` of [defineFlatConfig API](#defineflatconfig) .

- [Prettier](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/private-configs/prettier.ts) : By default, the contents of `.prettierrc` and `.prettierignore` are read and added to ESLint rules.
- [Tailwind CSS](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/private-configs/tailwindcss.ts) : By default, `tailwind.config.js` is passed as the Tailwind CSS configuration file.

#### Others

- [Node.js](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/node.ts)
- [Imports](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/imports.ts)
- [Regexp](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/regexp.ts)
- [Unicorn](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/unicorn.ts)

## 📚 Migration Notes

- Flat configs are unsupported in ESLint < 8.x.
- The `--ext` CLI option is no longer available ([#16991](https://github.com/eslint/eslint/issues/16991)).

## 📝 Release Notes

Please refer to [CHANGELOG](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/CHANGELOG.md) for details.

## 📜 License

MIT License © 2023-PRESENT [chengpeiquan](https://github.com/chengpeiquan)
