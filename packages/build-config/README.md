# @bassist/build-config

<p>
  <a href='https://www.npmjs.com/package/@bassist/build-config'>
    <img src="https://img.shields.io/npm/v/@bassist/build-config?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/build-config" target="__blank">
    <img src="https://img.shields.io/npm/dt/@bassist/build-config?color=f43f5e&label=downloads" />
  </a>
  <a href="https://jsdocs.io/package/@bassist/build-config" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

Opinionated collection of common build tool configurations, carefully crafted by [@chengpeiquan](https://github.com/chengpeiquan).

Currently provides configurations for the following build tools:

- [tsup](https://github.com/egoist/tsup): The most convenient tool for building TypeScript libraries based on ESBuild

## 🤔 Why do we need this?

While using certain tool configurations in a single repository is convenient enough, the process becomes tedious when many repositories use similar configurations.

By abstracting and sharing commonly used tool configurations, different projects can complete their setup faster.

## ⚡ Usage: Based on tsup

- 🎯 **Preset Configurations**: Provides out-of-the-box tsup base configurations
- 📦 **Multi-format Support**: Default support for CommonJS and ESM formats
- 🏷️ **Auto Banner**: Automatically generates file header comments based on package.json
- 🧹 **Auto Clean**: Automatically cleans output directory before building
- 📝 **Type Declarations**: Automatically generates TypeScript type declaration files
- ⚡ **Code Minification**: Built-in code compression functionality

### Installation

Install the package using your preferred package manager:

```bash
npm install -D @bassist/build-config tsup
```

**Note**: This submodule requires tsup as a peer dependency. As shown in the installation command above, please ensure tsup is installed.

### Usage

All APIs are provided uniformly by `@bassist/build-config/tsup`.

Typically, you only need to use the configuration returned by `createBaseConfig`, and you can pass custom options as needed:

```ts
import { createBaseConfig } from '@bassist/build-config/tsup'
import { defineConfig } from 'tsup'
import pkg from './package.json'

const config = createBaseConfig({ pkg })

export default defineConfig(config)
```

If the configuration options don't meet your needs, you can destructure and merge objects to pass them to the `defineConfig` API.

For more APIs and configuration options, please check the source code [tsup.ts](https://github.com/chengpeiquan/bassist/blob/main/packages/build-config/src/tsup.ts).

## 📝 Release Notes

Please refer to [CHANGELOG](https://github.com/chengpeiquan/bassist/blob/main/packages/build-config/CHANGELOG.md) for details.

## 📜 License

MIT License © 2025-PRESENT [chengpeiquan](https://github.com/chengpeiquan)
