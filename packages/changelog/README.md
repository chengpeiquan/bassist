# @bassist/changelog

<p>
  <a href='https://www.npmjs.com/package/@bassist/changelog'>
    <img src="https://img.shields.io/npm/v/@bassist/changelog?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/changelog" target="__blank">
    <img src="https://img.shields.io/npm/dt/@bassist/changelog?color=f43f5e&label=downloads" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist/tree/main/packages/changelog" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

Simple CHANGELOG generator by [@chengpeiquan](https://github.com/chengpeiquan) , based on [conventional-changelog-cli](https://www.npmjs.com/package/conventional-changelog-cli).

## Usage

This is a CLI tool, so you can use it with npx in your project root path.

```bash
npx @bassist/changelog
```

You can also install it locally and run it through commands such as pnpm exec.

```bash
pnpm add -D @bassist/changelog
```

In your `package.json` :

```json
{
  "scripts": {
    "gen:changelog": "pnpm exec changelog"
  }
}
```

## Options

On the command line, options can be passed to the program, e.g. `--preset angular`.

| Option | Default Value  | Description                                                                                                                                                                  |
| :----: | :------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| preset |   `angular`    | Name of the preset you want to use. Must be one of the following: `angular`, `atom`, `codemirror`, `conventionalcommits`, `ember`, `eslint`, `express`, `jquery` or `jshint` |
| infile | `CHANGELOG.md` | Read the CHANGELOG from this file, and outputting to the same file                                                                                                           |
|  path  |    `./src`     | Generate a changelog scoped to a specific directory                                                                                                                          |

## Release Notes

Please refer to [CHANGELOG](https://github.com/chengpeiquan/bassist/blob/main/packages/eslint/CHANGELOG.md) for details.

## License

MIT License © 2023-PRESENT [chengpeiquan](https://github.com/chengpeiquan)
