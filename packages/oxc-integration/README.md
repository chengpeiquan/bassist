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

English | [简体中文](./README.zh-CN.md)

`@bassist/oxc-integration` is an Oxc-first workflow package for projects that want typed `oxlint.config.ts` and `oxfmt.config.ts` setups today, while still keeping an ESLint fallback available where framework coverage is not yet enough.

## Usage

Using this package usually follows four steps:

1. Install dependencies (See: [Install](#install))
2. Add `oxlint.config.ts` (See: [Oxlint Quick Start](#oxlint-quick-start))
3. Add `oxfmt.config.ts` (See: [Oxfmt Quick Start](#oxfmt-quick-start))
4. Add `eslint.config.js` only when your project needs fallback coverage (See: [ESLint Fallback Quick Start](#eslint-fallback-quick-start))

## Install

```sh
npm i -D oxlint oxfmt @bassist/oxc-integration
```

If your project needs ESLint fallback, install the framework-specific ESLint packages too.

## Editor Setup

`oxlint` / `eslint` CLI checks and editor diagnostics are not the same thing.

If you want in-editor Oxc lint feedback while coding, install an Oxc editor
extension too. Otherwise you may only discover some issues when running the
lint command in the terminal, even though the editor showed no warning.

- VS Code / Cursor: install the official `oxc.oxc-vscode` extension
- Other editors: follow the official Oxc editor setup guide

See the official docs: https://oxc.rs/docs/guide/usage/linter/editors.html

Oxc editor extensions use `oxlint --lsp` from your project, so make sure
`oxlint` is installed locally in `devDependencies`.

If you use VS Code or Cursor, adding a workspace-level
`.vscode/settings.json` can make save actions and type-aware checks feel much
more complete:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always",
    "source.fixAll.oxc": "always"
  },
  "oxc.typeAware": true
}
```

- `source.fixAll.oxc` enables Oxc fixes on save through the `oxc.oxc-vscode` extension
- `oxc.typeAware: true` helps the extension provide type-aware diagnostics when your project uses TypeScript
- Keep `source.fixAll.eslint` if your project also uses `eslint.config.js` as a fallback layer
- If your project is fully Oxlint-only, you can remove the ESLint save action

## Positioning

- Use `@bassist/eslint-config` when you want the current stable ESLint-first mainline.
- Use `@bassist/oxc-integration` when you want an Oxc-first workflow package.
- Treat this package as the transition path toward a future `@bassist/oxc-config`.

## How It Works

`@bassist/oxc-integration` uses an Oxc-first workflow:

- `oxlint` is the primary linter
- `eslint` is the fallback linter for rules not fully covered by Oxc yet
- `oxfmt` is the primary formatter

This is why some projects still keep both `oxlint.config.ts` and `eslint.config.js`.
They are not two equal lint entrypoints anymore:

- `oxlint.config.ts` is the main lint config
- `eslint.config.js` is the fallback config

Inside the fallback presets, `eslint-plugin-oxlint` is applied to disable overlapping ESLint rules that Oxlint already covers.

## When You Need ESLint Fallback

Use only `oxlint.config.ts` when Oxc already covers your project well enough.
Add `eslint.config.js` when your project still needs ecosystem-specific ESLint coverage.

In practice:

- `base` / `node`: often Oxlint-only is enough
- `react`: Oxlint-first works well, but ESLint fallback is still useful in many projects
- `vue`: keep ESLint fallback by default
- `next`: keep ESLint fallback by default
- `tailwindcss`: add ESLint fallback when your project uses Tailwind CSS utility classes
- `vitest`: add ESLint fallback when you want test-specific rules beyond Oxlint

## Built-in Fallback Coverage

Current built-in ESLint fallback presets provided by `@bassist/oxc-integration`:

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

Current out-of-scope area for this Oxc-first workflow:

- `lint-md`
- Prettier-based Markdown content workflows

These can be revisited later as a separate content-layer workflow.

## Config Overview

| Project Type | `oxlint.config.ts` | `eslint.config.js` | `oxfmt.config.ts` |
| ------------ | ------------------ | ------------------ | ----------------- |
| Base TS/JS   | required           | optional           | required          |
| Node         | required           | optional           | required          |
| React        | required           | recommended        | required          |
| Vue          | required           | recommended        | required          |
| Next         | required           | recommended        | required          |

## Oxlint Quick Start

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

If you need official `oxlint` types, import them directly from `oxlint` instead of from this package.

## Built-in Oxlint Defaults

`oxlintPresets.base()` is not an empty shell. It already enables the shared Oxc baseline used by this package.

Current built-in defaults include:

- plugins: `typescript`, `oxc`
- categories:
  - `correctness: error`
  - `suspicious: error`
  - `pedantic: warn`
  - `style: off`
- base override:
  - `typescript/no-explicit-any: off`

Then higher-level presets extend that baseline:

- `oxlintPresets.node()` adds Node runtime env
- `oxlintPresets.react()` adds `react`, `react-perf`, `jsx-a11y`
- `oxlintPresets.vue()` adds `vue`
- `oxlintPresets.vitest()` adds `vitest`

## Extending Oxlint Presets

Use the built-in defaults first, then pass extra config only for project-specific overrides.

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

Think of the presets as the default baseline, and the extra object as the per-project extension layer.

## ESLint Fallback Quick Start

### Vue / Next / complex React projects

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

For Vue projects, switch `react()` to `vue()`.
For Next projects, use `next()`.
Add `tailwindcss()` only when the project actually uses Tailwind CSS.

### Markdown content linting

```js
// eslint.config.js
import { defineEslintConfig, eslintPresets } from '@bassist/oxc-integration'

export default defineEslintConfig(eslintPresets.markdown())
```

Use `markdown()` when you want standalone Markdown linting behavior without
pulling Markdown files into the `lint-md` or Prettier-based content workflow.

## Oxfmt Quick Start

Prefer a typed `oxfmt.config.ts` file so the config shape stays aligned with the official formatter API.

```ts
// oxfmt.config.ts
import { defineConfig } from 'oxfmt'
import { oxfmtConfig } from '@bassist/oxc-integration'

export default defineConfig(oxfmtConfig)
```

If you want to override the defaults:

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

`oxfmt .` will automatically discover `oxfmt.config.ts`, so you usually do not need to pass a config path explicitly.

If you need official formatter types, import them directly from `oxfmt` instead of from this package.

## Recommended Scripts

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

Recommended usage:

- start with `lint` for `base` / `node`
- use `lint:full` for `vue`, `next`, and more complex `react` projects
