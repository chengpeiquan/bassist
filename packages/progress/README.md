# @bassist/progress

<p>
  <a href='https://www.npmjs.com/package/@bassist/progress'>
    <img src="https://img.shields.io/npm/v/@bassist/progress?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/progress" target="__blank">
    <img src="https://img.shields.io/npm/dm/@bassist/progress?color=f43f5e&label=" />
  </a>
  <a href="https://paka.dev/npm/@bassist/progress" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

Simple slim progress bars base on [NProgress](https://www.npmjs.com/package/nprogress).

## Usage

With npm(or yarn, or pnpm):

```bash
npm install @bassist/progress
```

In `.js` / `.ts` or other files:

```ts
import progress from '@bassist/progress'

// Used in the framework's router hooks.
// Or in other scenarios (e.g. AJAX requests).

router.beforeEach(() => {
  progress.start()
})

router.afterEach(() => {
  progress.done()
})
```

All configurations and options of [NProgress](https://www.npmjs.com/package/nprogress) are supported.

## Set Color

This plugin extends NProgress's API and adds a `setColor` method.

- Type Declarations:

```ts
export interface Progress extends NProgress {
  /**
   *
   * @param color - A valid CSS color value or CSS variable
   *
   * @example use HEX
   *  progress.setColor('#ff0000')
   *
   * @example use RGB
   *  progress.setColor('rgb(255, 0, 0)')
   *
   * @example use RGBA
   *  progress.setColor('rgba(255, 0, 0, 1)')
   *
   * @example use CSS Variable
   *  progress.setColor('var(--color-primary)')
   */
  // eslint-disable-next-line no-unused-vars
  setColor: (color: string) => void
}
```

- Example:

```ts
import progress from '@bassist/progress'

// Set the color before start
progress.setColor('#ff0000')

// Then, used in the framework's router hooks.
// Or in other scenarios (e.g. AJAX requests).

router.beforeEach(() => {
  progress.start()
})

router.afterEach(() => {
  progress.done()
})
```

## Release Notes

Please refer to [CHANGELOG](https://github.com/chengpeiquan/bassist/blob/main/packages/progress/CHANGELOG.md) for details.

## License

MIT License © 2022 [chengpeiquan](https://github.com/chengpeiquan)
