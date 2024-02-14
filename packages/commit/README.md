# @bassist/commit

<p>
  <a href='https://www.npmjs.com/package/@bassist/commit'>
    <img src="https://img.shields.io/npm/v/@bassist/commit?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/commit" target="__blank">
    <img src="https://img.shields.io/npm/dt/@bassist/commit?color=f43f5e&label=downloads" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist/tree/main/packages/commit" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

Simple Commit Lint by [@chengpeiquan](https://github.com/chengpeiquan) .

## Usage

Please configure Git Hooks management tools based on [Husky](https://github.com/typicode/husky) or [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks) in advance in your project.

Take `Husky` as an example:

1. Initialize Husky configuration according to [getting-started](https://typicode.github.io/husky/get-started.html) documentation

```bash
pnpm add -D husky
pnpm exec husky init
```

2. Run the following command on the command line to add the check script to the `commit-msg` hook:

```bash
npx husky set .husky/commit-msg 'npx @bassist/commit "$1"'
```

If this package is installed locally (e.g. `devDependencies` ), it can also be called through the `commit` alias.

```bash
pnpm add -D @bassist/commit
npx husky set .husky/commit-msg 'pnpm exec commit "$1"'
```

## FAQ

- Q: hook was ignored because it's not set as executable

A: solve it with the command below (See: [#1177](https://github.com/typicode/husky/issues/1177)).

```bash
chmod ug+x .husky/*
```

## Git Commit Message Convention

This is the most popular commit message specification in the world (See: [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)).

Whether it is large open source projects or technical teams of large companies, this specification is basically used. Following it will make your work more professional.

In some work scenarios, combined with automated tools, these standardized commit messages can shorten your work time (See: [Related tools](#related-tools)).

### TL;DR:

Messages must be matched by the following regex:

```
/^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip)(\(.+\))?: .{1,50}/
```

### Examples

Appears under "Features" header, `utils` subheader:

```
feat(utils): add 'formatTime' to format the time as 'yyyy-MM-dd HH:mm:ss'
```

Appears under "Bug Fixes" header, `eslint` subheader, with a link to issue #24:

```
fix(eslint): fix some misconfigurations for React rules

close #24
```

Appears under "Performance Improvements" header, and under "Breaking Changes" with the breaking change explanation:

```
perf(node-utils): enable more new Node.js features

BREAKING CHANGE: Drop support for Node 14.
```

The following commit and commit `afbd143` do not appear in the changelog if they are under the same release. If not, the revert commit appears under the "Reverts" header.

```
revert: feat(eslint): add some APIs exports

This reverts commit afbd1436b6b09035f3c17c16daec0493eff54b6d.
```

### Full Message Format

A commit message consists of a **header**, **body** and **footer**. The header has a **type**, **scope** and **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body, it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

If the prefix is `feat`, `fix` or `perf`, it will appear in the changelog. However, if there is any [BREAKING CHANGE](#footer), the commit will always appear in the changelog.

Other prefixes are up to your discretion. Suggested prefixes are `docs`, `chore`, `style`, `refactor`, and `test` for non-changelog related tasks.

### Scope

The scope could be anything specifying the place of the commit change. For example `utils`, `node-utils`, `eslint`, `uno`, `tsconfig` etc...

Usually classified according to functional modules, if it is Monorepo, it is classified more according to Packages.

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

## Related tools

- [git-commit-analytics](https://github.com/analyticsjs/git-commit-analytics)

A tool to analyze your git repository's commit log. It can help you generate daily/weekly or longer work reports.

- [CHANGELOG Generator](https://github.com/chengpeiquan/bassist/blob/main/scripts/changelog.ts)

In the form of programming, combined with Git Tags and CI/CD, a CHANGELOG is generated based on the commit message.

## Release Notes

Please refer to [CHANGELOG](https://github.com/chengpeiquan/bassist/blob/main/packages/commit/CHANGELOG.md) for details.

## License

MIT License © 2023-PRESENT [chengpeiquan](https://github.com/chengpeiquan)
