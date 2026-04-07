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

[English](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/README.md) | 简体中文

一款现代化的扁平 ESLint 配置，适用于 [ESLint](https://eslint.org/) v9 和 v10 ，由 [@chengpeiquan](https://github.com/chengpeiquan) 精心打造。

## ⚡ 使用方法

使用此 ESLint 配置仅需三步：

1. 安装依赖（参考：[🚀 安装](#-安装)）
2. 添加 ESLint 配置文件（参考：[📂 配置文件](#-配置文件)）
3. 在 VS Code 的 `settings.json` 启用自动 Lint（参考：[🛠 VS Code 配置](#-vs-code-配置)）

这个快速指南可以作为入门辅助，避免遗漏关键步骤 🚀 。

## 🚀 安装

使用常用的包管理器安装该包：

```bash
npm install -D eslint @bassist/eslint-config
```

**注意：** 支持 ESLint `9.x` 和 `10.x`，并且需要 TypeScript 版本 >= `5.0.0`。

如果使用的是 `pnpm`，建议在项目根目录添加 `.npmrc` 文件，并包含以下配置，以更顺利地处理 peer 依赖：

```ini
shamefully-hoist=true
auto-install-peers=true
```

> 如果仍在使用 ESLint v8，请参考旧版（已不再维护）包：[@bassist/eslint](https://www.npmjs.com/package/@bassist/eslint)。

## 📂 配置文件

在项目根目录创建 `eslint.config.js` 文件：

```js
// eslint.config.js
import { imports, typescript } from '@bassist/eslint-config'

// 导出一个包含多个配置对象的数组
export default [...imports, ...typescript]
```

然后在 `package.json` 中添加 "type": "module" ：

```json
{
  "type": "module",
  "scripts": {
    "lint": "eslint src",
    "lint:inspector": "npx @eslint/config-inspector"
  }
}
```

运行 `npm run lint` 以检查代码，或运行 `npm run lint:inspector` 在 `http://localhost:7777` 查看可视化的 ESLint 配置。

> Bun 可以直接加载 `eslint.config.ts` 。如果你通过 Node.js 运行 ESLint，建议改用 `eslint.config.mjs`，或者按照 ESLint 文档完成[额外的设置](https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files)。

```bash
# Bun 优先的用法
bun run lint
```

## 🧩 JSONC 预设

如果希望 ESLint 直接检查 JSON 系列文件，可以使用 `jsonc` 预设：

```js
// eslint.config.js
import { jsonc } from '@bassist/eslint-config'

export default [...jsonc]
```

`jsonc` 的默认行为：

- 支持 `.json`、`.jsonc`、`.json5`
- 默认递归排序对象 key（`jsonc/sort-keys`）
- 默认忽略 `package.json`，让包清单 key 排序继续交给格式化流程处理

如果你在 VS Code 里通过 ESLint 扩展做校验，并且手动设置了
`eslint.validate`，记得把 `json` 和 `jsonc` 也加进去。

如果需要，也可以在项目里覆盖默认行为：

```js
import { jsonc } from '@bassist/eslint-config'

export default [
  ...jsonc,
  {
    files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
    rules: {
      'jsonc/sort-keys': 'off',
    },
  },
]
```

## ✅ 类型安全的配置

为了增强类型安全性，可以使用 `defineFlatConfig`:

```js
// @ts-check
import { defineFlatConfig, imports, vue } from '@bassist/eslint-config'

export default defineFlatConfig([
  ...imports,
  ...vue,
  // 添加更多自定义配置
  {
    // 为每个配置提供名称，以便在运行 `npm run lint:inspector` 时，
    // 可以在可视化工具中清晰展示
    name: 'my-custom-rule/vue',
    rules: {
      // 例如：默认情况下，该规则是 `off`
      'vue/component-tags-order': 'error',
    },
    ignores: ['examples'],
  },
])
```

## 🛠 VS Code 配置

在 VS Code 工作区的 `settings.json` 添加以下配置，以启用自动 Lint 修复：

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always",
    "source.fixAll.prettier": "always"
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.useFlatConfig": true,
  "eslint.format.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "json",
    "jsonc"
  ],
  "prettier.configPath": "./.prettierrc.js"
}
```

关于 `prettier.configPath` 请查看 [格式化工具](#格式化工具) 部分。

## 📘 API 参考

### defineFlatConfig

定义 ESLint 配置，可选支持 Prettier 和 Tailwind CSS。

API 类型声明：

```ts
/**
 * 定义 ESLint 配置，可选支持 Prettier 集成。
 *
 * @param configs 基础 ESLint 配置数组。
 * @param options - 配置选项。
 * @returns 最终的 ESLint 配置数组。
 */
declare const defineFlatConfig: (
  configs: FlatESLintConfig[],
  options?: DefineFlatConfigOptions,
) => FlatESLintConfig[]
```

选项类型声明：

```ts
interface DefineFlatConfigOptions {
  /**
   * 指定用于加载 `.prettierrc` 配置的工作目录。
   *
   * 配置文件应为 JSON 格式。
   *
   * @default process.cwd()
   */
  cwd?: string

  /**
   * 如果 `prettierEnabled` 设为 `false`，则所有与 Prettier 相关的规则和配置都将被忽略， 即使提供了
   * `prettierRules` 也不会生效。
   *
   * @default true
   */
  prettierEnabled?: boolean

  /**
   * 默认情况下，会从当前工作目录读取 `.prettierrc`，并且 `.prettierrc` 文件必须是 JSON 格式。
   *
   * 如果配置文件不是 JSON 格式，或者使用了不同的文件名，可以将其转换为 JSON 规则后传入。
   *
   * 读取自定义配置后，会与默认的 ESLint 规则合并。
   *
   * @see https://prettier.io/docs/configuration.html
   */
  prettierRules?: PartialPrettierExtendedOptions

  /**
   * Tailwind CSS 规则默认启用。如果它们影响了项目，可以通过该选项禁用。
   *
   * @default true
   */
  tailwindcssEnabled?: boolean

  /**
   * 如果需要覆盖 Tailwind CSS 配置，可以传入相应的选项。
   *
   * 如果想要合并配置，可以导入 `defaultTailwindcssSettings`，手动合并后再传入。
   *
   * 如果传入空对象 `{}`，则会使用默认设置。
   *
   * @see https://github.com/francoismassart/eslint-plugin-tailwindcss/tree/v3.18.2
   */
  tailwindcssSettings?: TailwindcssSettings
}
```

### createGetConfigNameFactory

`createGetConfigNameFactory` 是一个灵活的工具函数，用于生成 ESLint 配置命名工具。它可以快速拼接配置名称，确保命名空间一致，并便于组织和管理复杂的规则集。

API 类型声明：

```ts
/**
 * 一个灵活的工具函数，用于生成 ESLint 配置命名工具。 它可以快速拼接配置名称，确保命名空间一致，并便于组织和管理复杂的规则集。
 *
 * @param prefix - 表示配置名称前缀的字符串。
 * @returns 一个函数，该函数会将提供的名称片段与指定的前缀拼接在一起。
 */
declare const createGetConfigNameFactory: (
  prefix: string,
) => (...names: string[]) => string
```

使用示例：

```ts
import {
  createGetConfigNameFactory,
  defineFlatConfig,
} from '@bassist/eslint-config'

const getConfigName = createGetConfigNameFactory('my-prefix')

export default defineFlatConfig([
  {
    name: getConfigName('ignore'), // --> `my-prefix/ignore`
    ignores: ['**/dist/**', '**/.build/**', '**/CHANGELOG.md'],
  },
])
```

为什么要使用它？

- 一致性：强制执行清晰统一的配置命名模式。
- 灵活性：允许为不同项目或范围自定义前缀。
- 简化管理：便于组织和浏览大型 ESLint 配置。

这个工具在构建可复用的 ESLint 配置或维护复杂项目的规则集时尤其有用。

## 📦 导出的配置

这些是一些常用的配置，如果有额外需求，欢迎提交 PR！

### 语言支持

- [JavaScript](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/javascript.ts)
- [TypeScript](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/typescript.ts)
- [JSX](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/jsx.ts)
- [JSON / JSONC / JSON5](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/jsonc.ts)
- [Markdown](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/markdown.ts)

#### 框架支持

- [Next.js](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/next.ts)
- [React](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/react.ts)
- [Vue (v2 and v3)](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/vue.ts)

#### 格式化工具

格式化规则默认启用，不会单独导出。如需自定义配置，请通过 [defineFlatConfig API](#defineflatconfig) 的 `options` 传入。

- [Prettier](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/private-configs/prettier.ts) :
  - 默认会读取 `.prettierrc` 和 `.prettierignore` 的内容，并添加到 ESLint 规则中。
  - 如果预期的配置文件不存在，则会使用 [内置的 Prettier](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/shared/prettier-config.mjs) 规则作为兜底规则。
  - 非以上配置文件并且不喜欢默认规则时，可以通过 [defineFlatConfig](#defineflatconfig) 的 `options.prettierRules` 将完整配置传递进来优先作为 ESLint 规则使用
- [Tailwind CSS](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/private-configs/tailwindcss.ts) :
  - 默认会将 `tailwind.config.js` 作为 Tailwind CSS 配置文件传入。
  - 非默认文件或者需要更改规则，可通过 `options.tailwindcssSettings` 传递

#### 其它

- [Node.js](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/node.ts)
- [Imports](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/imports.ts)
- [Regexp](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/regexp.ts)
- [Unicorn](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/src/configs/unicorn.ts)

## 📚 迁移指南

- 扁平化配置（Flat Configs）不支持 ESLint 8.x 以下的版本。
- `--ext` CLI 选项已被移除 ([#16991](https://github.com/eslint/eslint/issues/16991)) 。

## 📝 发布日志

详细更新内容请参考 [CHANGELOG](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint-config/CHANGELOG.md) 。

## 📜 License

MIT License © 2023-PRESENT [chengpeiquan](https://github.com/chengpeiquan)
