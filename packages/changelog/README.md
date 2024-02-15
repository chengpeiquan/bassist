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

If you are tired of remembering long command names and command line configurations every time, you can use this package to simplify the operation.

## Usage

This is a CLI tool, you can install it locally and run it through commands such as pnpm exec.

Install it:

```bash
pnpm add -D @bassist/changelog conventional-changelog-cli
```

In your `package.json` :

```json
{
  "scripts": {
    "gen:changelog": "pnpm exec changelog"
  }
}
```

Run on command line:

```bash
pnpm gen:changelog
```

You can see a CHANGELOG.md file in the project root directory, which will generate the software's change records based on your Git Logs.

## Implementation Principle

In this package, the program will run the conventional-changelog CLI command to generate CHANGELOG, so `conventional-changelog-cli`, as the peerDependency of the package, also needs to be installed together.

## Options

For most projects, the default settings are sufficient. If adjustments are sometimes needed, some options are provided to pass on.

On the command line, options can be passed to the program, e.g. `--preset angular` by option, or `-p angular` by short flag.

|    Option     | Short Flag | Default Value  | Description                                                                                                                                                                  |
| :-----------: | :--------: | :------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| lerna-package |     l      |                | Generate a changelog for a specific lerna package (:pkg-name@1.0.0)                                                                                                          |
|    preset     |     p      |   `angular`    | Name of the preset you want to use. Must be one of the following: `angular`, `atom`, `codemirror`, `conventionalcommits`, `ember`, `eslint`, `express`, `jquery` or `jshint` |
|    infile     |     i      | `CHANGELOG.md` | Read the CHANGELOG from this file, and outputting to the same file                                                                                                           |
| release-count |     r      |      `1`       | How many releases to be generated from the latest, If `0` , the whole changelog will be regenerated and the outfile will be overwritten directory                            |
|  commit-path  |            |    `./src`     | Generate a changelog scoped to a specific directory                                                                                                                          |

Btw: The paths are all based on `process.cwd()` , which is usually run from the root directory of the package (the directory where `package.json` is located).

If there are any running problems, please provide a reproducible example in the [issue](https://github.com/chengpeiquan/bassist/issues), or use [conventional-changelog-cli](https://www.npmjs.com/package/conventional-changelog-cli) directly (need to configure it yourself)

## Release Notes

Please refer to [CHANGELOG](https://github.com/chengpeiquan/bassist/blob/main/packages/changelog/CHANGELOG.md) for details.

## License

MIT License © 2023-PRESENT [chengpeiquan](https://github.com/chengpeiquan)
