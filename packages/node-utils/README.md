# @bassist/node-utils

<p>
  <a href='https://www.npmjs.com/package/@bassist/node-utils'>
    <img src="https://img.shields.io/npm/v/@bassist/node-utils?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/node-utils" target="__blank">
    <img src="https://img.shields.io/npm/dm/@bassist/node-utils?color=f43f5e&label=" />
  </a>
  <a href="https://paka.dev/npm/@bassist/node-utils" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

Opinionated collection of common JavaScript / TypeScript utils by [@chengpeiquan](https://github.com/chengpeiquan) .

- 🌳 Fully tree shakeable
- 💪 Type Strong
- ⚡ Simplify complex operations

> Note: This package is only for use in Node.js, don't use it in the browser.

## Usage

With npm(or yarn, or pnpm):

```bash
npm install @bassist/node-utils
```

In `.js` / `.ts` or other files:

```ts
import { getPackageManagerByUserAgent } from '@bassist/node-utils'

console.log(getPackageManagerByUserAgent())
// { name: 'pnpm', version: '7.26.0' }
```

## Documentation

See: [Documentation of node-utils](https://paka.dev/npm/@bassist/node-utils)

## Release Notes

Please refer to [CHANGELOG](https://github.com/chengpeiquan/bassist/blob/main/packages/node-utils/CHANGELOG.md) for details.

## License

MIT License © 2022 [chengpeiquan](https://github.com/chengpeiquan)
