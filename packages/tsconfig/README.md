# @bassist/tsconfig

<p>
  <a href='https://www.npmjs.com/package/@bassist/tsconfig'>
    <img src="https://img.shields.io/npm/v/@bassist/tsconfig?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/tsconfig" target="__blank">
    <img src="https://img.shields.io/npm/dm/@bassist/tsconfig?color=f43f5e&label=" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist/tree/main/packages/tsconfig" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

Some TSConfig files for working with TypeScript projects by [@chengpeiquan](https://github.com/chengpeiquan) .

## Usage

With npm(or yarn, or pnpm):

```bash
npm install -D @bassist/tsconfig
```

In the `tsconfig.json` file, use the `extends` field to extends these configuration.

```json
{
  "extends": "@bassist/tsconfig/base.json",
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

## Configuration

See: [Source Code](https://github.com/chengpeiquan/bassist/tree/main/packages/tsconfig) .

Just change the file name of `extends` .

## License

MIT License © 2023-PRESENT [chengpeiquan](https://github.com/chengpeiquan)
