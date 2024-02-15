# @bassist/release

<p>
  <a href='https://www.npmjs.com/package/@bassist/release'>
    <img src="https://img.shields.io/npm/v/@bassist/release?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/release" target="__blank">
    <img src="https://img.shields.io/npm/dt/@bassist/release?color=f43f5e&label=downloads" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist/tree/main/packages/release" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

Simple GitHub release generator by [@chengpeiquan](https://github.com/chengpeiquan) , based on [GitHub CLI](https://cli.github.com/).

If you're tired of having to release every time on GitHub web, you can use this package to make it easier and just run a single command.

## Prerequisite

For the security of your account and to avoid Token leakage, you must first install GitHub CLI and complete the login on it.

See: [GitHub CLI](https://cli.github.com/)

And make sure you have Release permissions on the project's GitHub repository.

There is another requirement, please configure the repository information of `package.json` according to the specifications of npm docs.

See: [repository](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#repository)

e.g.

For single-package repo:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/chengpeiquan/bassist"
  }
}
```

For monorepo, you can specify the `directory` in which it lives:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/chengpeiquan/bassist",
    "directory": "packages/utils"
  }
}
```

Currently supported URL formats are:

- `https://github.com/chengpeiquan/bassist`
- `https://github.com/chengpeiquan/bassist.git`
- `github:chengpeiquan/bassist`

## Usage

This is a CLI tool, you can install it locally and run it through commands such as pnpm exec.

Install it:

```bash
pnpm add -D @bassist/release
```

In your `package.json` :

```json
{
  "scripts": {
    "gen:release": "pnpm exec release"
  }
}
```

Run on command line:

```bash
pnpm gen:release
```

You can view the latest release information on the releases page of your GitHub repository.

## Options

For most projects, the default settings are sufficient. If adjustments are sometimes needed, some options are provided to pass on.

On the command line, options can be passed to the program, e.g. `--preset angular` by option, or `-p angular` by short flag.

|  Option   | Short Flag | Default Value  | Description                                    |
| :-------: | :--------: | :------------: | :--------------------------------------------- |
|  branch   |     b      |     `main`     | The branch where the CHANGELOG file is located |
| changelog |     c      | `CHANGELOG.md` | The file name of the change log                |

Btw: The paths are all based on `process.cwd()` , which is usually run from the root directory of the package (the directory where `package.json` is located).

If there are any running problems, please provide a reproducible example in the [issue](https://github.com/chengpeiquan/bassist/issues) .

## Release Notes

Please refer to [CHANGELOG](https://github.com/chengpeiquan/bassist/blob/main/packages/release/CHANGELOG.md) for details.

## License

MIT License © 2023-PRESENT [chengpeiquan](https://github.com/chengpeiquan)
