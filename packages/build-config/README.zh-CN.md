# @bassist/build-config

<p>
  <a href='https://www.npmjs.com/package/@bassist/build-config'>
    <img src="https://img.shields.io/npm/v/@bassist/build-config?color=f43f5e&label=npm" />
  </a>
  <a href="https://www.npmjs.com/package/@bassist/build-config" target="__blank">
    <img src="https://img.shields.io/npm/dt/@bassist/build-config?color=f43f5e&label=downloads" />
  </a>
  <a href="https://jsdocs.io/package/@bassist/build-config" target="__blank">
    <img src="https://img.shields.io/static/v1?label=&message=docs%20%26%20demos&color=f43f5e" />
  </a>
  <a href="https://github.com/chengpeiquan/bassist" target="__blank">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/chengpeiquan/bassist?style=social" />
  </a>
</p>

一些常用的构建工具配置，由 [@chengpeiquan](https://github.com/chengpeiquan) 精心打造。

目前提供了以下构建工具的配置：

- [tsup](https://github.com/egoist/tsup): 基于 ESBuild，构建 TypeScript 库最便捷的工具

## 🤔 为什么需要这个？

单一仓库使用某些工具的配置确实已经足够方便，但如果有很多个仓库都用相似的配置，这个过程就会显得繁琐。

把一些常用的工具配置抽象出来共享，不同的项目可以更快完成配置。

## ⚡ 用法：基于 tsup

- 🎯 **预设配置**: 提供开箱即用的 tsup 基础配置
- 📦 **多格式支持**: 默认支持 CommonJS 和 ESM 格式
- 🏷️ **自动 Banner**: 根据 package.json 自动生成文件头注释
- 🧹 **自动清理**: 构建前自动清理输出目录
- 📝 **类型声明**: 自动生成 TypeScript 类型声明文件
- ⚡ **代码压缩**: 内置代码压缩功能

### 安装

使用常用的包管理器安装该包：

```bash
npm install -D @bassist/build-config tsup
```

**注意**: 该子模块需要 tsup 作为 peer dependency ，如上方安装命令，请确保已安装 tsup 。

### 用法

统一由 `@bassist/build-config/tsup` 提供所有 API 。

通常情况下进需要直接使用 `createBaseConfig` 返回的配置，可视情况传入自定义选项：

```ts
import { createBaseConfig } from '@bassist/build-config/tsup'
import { defineConfig } from 'tsup'
import pkg from './package.json'

const config = createBaseConfig({ pkg })

export default defineConfig(config)
```

如果配置项不满足，可以通过对象解构与合并，自行传给 `defineConfig` API 。

更多 API 和配置项请查看源码 [tsup.ts](https://github.com/chengpeiquan/bassist/blob/main/packages/build-config/src/tsup.ts) 。

## 📝 发布日志

详细更新内容请参考 [CHANGELOG](https://github.com/chengpeiquan/bassist/blob/main/packages/build-config/CHANGELOG.md) 。

## 📜 License

MIT License © 2025-PRESENT [chengpeiquan](https://github.com/chengpeiquan)
