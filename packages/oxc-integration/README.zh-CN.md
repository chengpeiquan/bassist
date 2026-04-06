# @bassist/oxc-integration

<p>
  <a href='https://www.npmjs.com/package/@bassist/oxc-integration'>
    <img src="https://img.shields.io/npm/v/@bassist/oxc-integration?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/oxc-integration" target="__blank">
    <img src="https://img.shields.io/npm/dy/@bassist/oxc-integration?color=f43f5e&label=downloads" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist/tree/main/packages/oxc-integration" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

[English](./README.md) | 简体中文

`@bassist/oxc-integration` 是一个 Oxc 优先的工作流包，适合希望现在就用上带类型提示的 `oxlint.config.ts` 与 `oxfmt.config.ts`，同时在 Oxc 能力尚未完全覆盖时保留 ESLint 兜底能力的项目。

## 使用方法

通常只需要四步：

1. 安装依赖（参考：[安装](#安装)）
2. 添加 `oxlint.config.ts`（参考：[Oxlint 快速开始](#oxlint-快速开始)）
3. 添加 `oxfmt.config.ts`（参考：[Oxfmt 快速开始](#oxfmt-快速开始)）
4. 只有在项目需要 fallback coverage 时，再补 `eslint.config.js`（参考：[ESLint Fallback 快速开始](#eslint-fallback-快速开始)）

## 安装

```sh
npm i -D oxlint oxfmt @bassist/oxc-integration
```

如果你的项目需要 ESLint fallback，请再安装对应框架所需的 ESLint 生态依赖。

## 编辑器设置

`oxlint` / `eslint` 的 CLI 检查结果，与编辑器里的实时诊断并不是同一件事。

如果你希望在编码过程中就获得 Oxc 的实时 lint 提示，还需要额外安装对应的编辑器插件。否则就可能出现“执行 lint 命令时能查出错误，但编辑器里没有任何
提示”的情况。

- VS Code / Cursor：安装官方 `oxc.oxc-vscode` 扩展
- 其他编辑器：参考 Oxc 官方的编辑器接入文档

官方文档： https://oxc.rs/docs/guide/usage/linter/editors.html

Oxc 的编辑器扩展会通过项目本地的 `oxlint --lsp` 工作，因此也请确保项目的
`devDependencies` 里已经安装了 `oxlint`。

## 定位

- 如果你需要当前稳定、完整的 ESLint 优先方案，请使用 `@bassist/eslint-config`
- 如果你想采用 Oxc 优先的工作流，请使用 `@bassist/oxc-integration`
- 可以把它理解为未来 `@bassist/oxc-config` 的过渡形态

## 工作方式

`@bassist/oxc-integration` 采用 Oxc-first workflow：

- `oxlint` 是主 Linter
- `eslint` 是兜底 Linter，用来补齐 Oxc 还没完全覆盖的规则
- `oxfmt` 是主 Formatter

这也是为什么某些项目现在仍然会同时保留 `oxlint.config.ts` 和 `eslint.config.js`。
它们不再是两个并列的主配置文件，而是：

- `oxlint.config.ts`：主 Lint 配置
- `eslint.config.js`：兜底 Lint 配置

在这些 fallback presets 内部，会自动接入 `eslint-plugin-oxlint`，用于关闭那些已经由 Oxlint 覆盖的 ESLint 重叠规则。

## 什么时候需要 ESLint Fallback

如果 Oxc 已经足够覆盖你的项目，可以只使用 `oxlint.config.ts`。
如果项目仍然依赖框架或生态特定的 ESLint 能力，则再补一个 `eslint.config.js`。

通常可以这样理解：

- `base` / `node`：很多场景只用 Oxlint 就够了
- `react`：大多数情况下可以 Oxc 优先，但很多项目仍建议保留 ESLint fallback
- `vue`：默认建议保留 ESLint fallback
- `next`：默认建议保留 ESLint fallback
- `tailwindcss`：如果项目使用 Tailwind CSS 原子类，建议补上 ESLint fallback
- `vitest`：如果你需要更完整的测试规则，建议保留 ESLint fallback

## 内建的 Fallback Coverage

当前 `@bassist/oxc-integration` 已内建这些 ESLint fallback presets：

- `javascript`
- `typescript`
- `jsx`
- `imports`
- `markdown`
- `react`
- `tailwindcss`
- `vue`
- `next`
- `vitest`

当前暂不纳入这个 Oxc-first 工作流范围的内容：

- `lint-md`
- 基于 Prettier 的 Markdown 内容工作流

这些能力后续可以单独作为内容层工作流再设计。

## 配置总览

| 项目类型   | `oxlint.config.ts` | `eslint.config.js` | `oxfmt.config.ts` |
| ---------- | ------------------ | ------------------ | ----------------- |
| Base TS/JS | 必需               | 可选               | 必需              |
| Node       | 必需               | 可选               | 必需              |
| React      | 必需               | 推荐               | 必需              |
| Vue        | 必需               | 推荐               | 必需              |
| Next       | 必需               | 推荐               | 必需              |

## Oxlint 快速开始

### Base TS/JS

```ts
// oxlint.config.ts
import { defineOxlintConfig, oxlintPresets } from '@bassist/oxc-integration'

export default defineOxlintConfig(oxlintPresets.base())
```

### React

```ts
// oxlint.config.ts
import { defineOxlintConfig, oxlintPresets } from '@bassist/oxc-integration'

export default defineOxlintConfig(oxlintPresets.react(), oxlintPresets.vitest())
```

### Vue

```ts
// oxlint.config.ts
import { defineOxlintConfig, oxlintPresets } from '@bassist/oxc-integration'

export default defineOxlintConfig(oxlintPresets.vue(), oxlintPresets.vitest())
```

如果你需要官方 `oxlint` 类型，请直接从 `oxlint` 包导入，而不是从本包导入。

## Oxlint 内建默认值

`oxlintPresets.base()` 并不是空壳，它已经内置了这个包约定的 Oxc 基线配置。

当前内建默认值包括：

- plugins：`typescript`、`oxc`
- categories：
  - `correctness: error`
  - `suspicious: error`
  - `pedantic: warn`
  - `style: off`
- 基础规则覆盖：
  - `typescript/no-explicit-any: off`

然后更高层的 presets 会在这份基线上继续扩展：

- `oxlintPresets.node()` 会补充 Node 运行时环境
- `oxlintPresets.react()` 会补充 `react`、`react-perf`、`jsx-a11y`
- `oxlintPresets.vue()` 会补充 `vue`
- `oxlintPresets.vitest()` 会补充 `vitest`

## 如何扩展 Oxlint Presets

建议先使用内建默认值，再把项目特有的差异作为额外配置传入。

```ts
// oxlint.config.ts
import { defineOxlintConfig, oxlintPresets } from '@bassist/oxc-integration'

export default defineOxlintConfig(oxlintPresets.react(), {
  rules: {
    'no-console': 'warn',
  },
  ignorePatterns: ['fixtures/**'],
})
```

可以把 presets 理解成默认基线，把额外传入的对象理解成项目级扩展层。

## ESLint Fallback 快速开始

### Vue / Next / 复杂 React 项目

```js
// eslint.config.js
import { defineEslintConfig, eslintPresets } from '@bassist/oxc-integration'

export default defineEslintConfig(
  eslintPresets.imports(),
  eslintPresets.react(),
  eslintPresets.tailwindcss(),
  eslintPresets.vitest(),
)
```

如果是 Vue 项目，把 `react()` 换成 `vue()` 即可。
如果是 Next 项目，请使用 `next()`。
只有项目真的在使用 Tailwind CSS 时，才需要再加上 `tailwindcss()`。

### Markdown 内容 lint

```js
// eslint.config.js
import { defineEslintConfig, eslintPresets } from '@bassist/oxc-integration'

export default defineEslintConfig(eslintPresets.markdown())
```

如果你只想为 Markdown 文件开启独立的 lint 行为，而不希望把它并入
`lint-md` 或基于 Prettier 的内容工作流，可以使用 `markdown()`。

## Oxfmt 快速开始

建议优先使用带类型提示的 `oxfmt.config.ts`，这样配置结构会与官方 formatter API 保持一致。

```ts
// oxfmt.config.ts
import { defineConfig } from 'oxfmt'
import { oxfmtConfig } from '@bassist/oxc-integration'

export default defineConfig(oxfmtConfig)
```

如果你想覆盖默认值：

```ts
// oxfmt.config.ts
import { defineConfig } from 'oxfmt'
import { getOxfmtConfig } from '@bassist/oxc-integration'

export default defineConfig(
  getOxfmtConfig({
    semi: true,
  }),
)
```

`oxfmt .` 会自动发现 `oxfmt.config.ts`，所以通常不需要额外显式传入配置路径。

如果你需要官方 formatter 类型，请直接从 `oxfmt` 包导入，而不是从本包导入。

## 推荐脚本

```json
{
  "scripts": {
    "lint": "oxlint .",
    "lint:eslint": "eslint .",
    "lint:full": "npm run lint && npm run lint:eslint",
    "format": "oxfmt ."
  }
}
```

推荐用法：

- `base` / `node` 项目先从 `lint` 开始
- `vue`、`next`、以及较复杂的 `react` 项目默认建议使用 `lint:full`
