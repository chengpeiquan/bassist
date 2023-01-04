# @bassist/utils

<p>
  <a href='https://www.npmjs.com/package/@bassist/utils'>
    <img src="https://img.shields.io/npm/v/@bassist/utils?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/utils" target="__blank">
    <img src="https://img.shields.io/npm/dm/@bassist/utils?color=f43f5e&label=" />
  </a>
  <a href="https://paka.dev/npm/@bassist/utils" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

Opinionated collection of common JavaScript / TypeScript utils by [@chengpeiquan](https://github.com/chengpeiquan) .

- 🌳 Fully tree shakeable
- 💪 Type Strong
- 💡 No bundler required
- 🦄 SSR Friendly

## Usage

With npm(or yarn, or pnpm):

```bash
npm install @bassist/utils
```

In `.js` / `.ts` or other files:

```ts
import { isMobile } from '@bassist/utils'

if (isMobile()) {
  // do something...
}
```

With CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@bassist/utils"></script>
<script>
  // All methods are on the `Utils` variable
  console.log(Utils)

  if (Utils.isMobile()) {
    // do something...
  }
</script>
```

## Documentation

See: [Documentation of utils](https://paka.dev/npm/@bassist/utils)

## License

MIT License © 2022 [chengpeiquan](https://github.com/chengpeiquan)
