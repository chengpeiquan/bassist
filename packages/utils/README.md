# @withtypes/md5

MD5 with types.

Merged [md5](https://www.npmjs.com/package/md5) and [@types/md5](https://www.npmjs.com/package/@types/md5) , install this package to get both, no other features.

## Why?

I got tired of having to install an additional `@types/**` package every time in my TypeScript project to support type inference for these utilities.

So I merged them, but in fact, after installing this package, the original package will still be installed implicitly, and all functions are provided by the original package.

## Installation

Install the package from npm (or yarn, or pnpm).

```bash
# Just install this package
npm i @withtypes/md5
```

This replaces the original problem of needing to install twice:

```bash
# No need to install this now
npm i md5
npm i -D @types/md5
```

## Usage

This package does not have its own function implementation, Just replace the package name in the `import` statement.

```diff
-import md5 from 'md5'
+import md5 from '@withtypes/md5'
```

So it is exactly the same APIs as the original package in use.

```ts
import md5 from '@withtypes/md5'

const before = 'Hello World'
const after = md5(before)
console.log({ before, after })
// { before: 'Hello World', after: 'b10a8db164e0754105b7a99be72e3fe5' }
```

## Documentation

See: [Documentation of MD5](https://github.com/pvorb/node-md5#readme)

## License

MIT License © 2022 [chengpeiquan](https://github.com/chengpeiquan)
