# @bassist/eslint

<p>
  <a href='https://www.npmjs.com/package/@bassist/eslint'>
    <img src="https://img.shields.io/npm/v/@bassist/eslint?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/eslint" target="__blank">
    <img src="https://img.shields.io/npm/dt/@bassist/eslint?color=f43f5e&label=downloads" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist/tree/main/packages/eslint" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

Flat ESLint config for [ESLint](https://eslint.org/) by [@chengpeiquan](https://github.com/chengpeiquan) .

## Usage

With npm(or yarn, or pnpm):

```bash
npm install -D eslint @bassist/eslint
```

Yeah, this is a ESLint configuration, so you need to install ESLint at the same time.

If using TypeScript's Lint configuration, also make sure TypeScript is installed.

Requires ESLint >= `8.0.0` , and TypeScript >= `5.0.0` .

## Configuration File

Create a configuration file named `eslint.config.js` in the root path of the project.

> If using another filename (e.g. `eslint.config.cjs` or `eslint.config.mjs`), please use the `--config` command line option to specify your config.

### Simple Usage

You can import the desired presets depending on the type of project, please remember that each config is an array, and the default export is also an array.

```js
// eslint.config.js
import { prettier, vue } from '@bassist/eslint'
export default [...prettier, ...vue]
```

Yeah, the config file cannot be a file name such as `.eslintrc.js` or `.eslintrc.json` and so on, see [Migration](#migration) .

Next, add the `"type": "module"` setting and a lint script in the project's `package.json`.

```json
{
  "type": "module",
  "scripts": {
    "lint": "eslint src"
  }
}
```

In lint script, `src` is your source code folder, please adjust it according to the actual situation.

You can run `npm run lint` to start linting the code.

### Usage with type checking

If you need to adjust or add configuration, it is recommended to wrap the configuration through the `defineFlatConfig` of `defineConfig` (Alias) API to get a better configuration experience.

Remember use `// @ts-check` at the first line in your `eslint.config.js` .

```js
// @ts-check
import { defineFlatConfig, prettier, vue } from '@bassist/eslint'

export default defineFlatConfig([
  ...prettier,
  ...vue,
  {
    rules: {
      // By default, this rule is `off`
      'vue/component-tags-order': 'error',
    },
    ignores: ['examples'],
  },
])
```

See [eslint-define-config](https://github.com/Shinigami92/eslint-define-config) to learn more.

## Note

1. ESLint lower than 8.x does not support this configuration file.
2. In ESLint 8.x, VS Code needs to enable special configuration to use this configuration file normally, see: [VS Code Setting](#vs-code-setting)
3. The lint script no longer supports the `--ext` option, see: [#16991](https://github.com/eslint/eslint/issues/16991) .
4. Currently this package is not friendly to CommonJS, please enable `"type": "module"` to support ES Module, see: [Configuration](#configuration) .

## VS Code Setting

Please turn on this setting, which can solve VS Code's error reporting to `eslint.config.js`.

If the version number of ESLint is lower than 8.57 :

```json
{
  "eslint.experimental.useFlatConfig": true
}
```

Use ESLint version 8.57 or later and `eslint.useFlatConfig` instead.

```json
{
  "eslint.useFlatConfig": true
}
```

In order not to affect other irrelevant projects, it is highly recommended that this setting only take effect in the workspace, not globally. So please fill it into `.vscode/settings.json`.

## ESLint Config

This package exports some config of ESLint, which can be imported via named.

### Helpers

Helper functions and types for type checking are provided here (See: [Usage with type checking](#usage-with-type-checking)).

- [Define](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint/src/define.ts)

### Languages

- [JavaScript (with JSX)](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint/src/configs/javascript.ts)
- [TypeScript](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint/src/configs/typescript.ts)
- [Markdown](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint/src/configs/markdown.ts)

### Frameworks

Typescript rules are built-in when using framework presets.

- [React](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint/src/configs/react.ts)
- [Vue (v2 and v3)](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint/src/configs/vue.ts)
- [Uno CSS](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint/src/configs/unocss.ts)

### Formatters

- [Prettier](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint/src/configs/prettier.ts)

### Others

- [Imports](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint/src/configs/imports.ts)
- [Unicorn](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint/src/configs/unicorn.ts)

## Migration

If you want to migrate your ESLint configuration file from the eslintrc format (typically configured in `.eslintrc.js` or `.eslintrc.json` files) to the new flat config format (typically configured in an `eslint.config.js` file).

See: [Configuration Migration Guide](https://eslint.org/docs/latest/use/configure/migration-guide)

Related Reading:

- [Configuration Files (New)](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- [ESLint's new config system, Part 1: Background](https://eslint.org/blog/2022/08/new-config-system-part-1/)
- [ESLint's new config system, Part 2: Introduction to flat config](https://eslint.org/blog/2022/08/new-config-system-part-2/)
- [ESLint's new config system, Part 3: Developer preview](https://eslint.org/blog/2022/08/new-config-system-part-3/)

## Release Notes

Please refer to [CHANGELOG](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint/CHANGELOG.md) for details.

## License

MIT License © 2023-PRESENT [chengpeiquan](https://github.com/chengpeiquan)
