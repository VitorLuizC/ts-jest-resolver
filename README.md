# ts-jest-resolver

[![Build Status](https://travis-ci.org/VitorLuizC/ts-jest-resolver.svg?branch=master)](https://travis-ci.org/VitorLuizC/ts-jest-resolver)
[![License](https://badgen.net/github/license/VitorLuizC/ts-jest-resolver)](./LICENSE)

A resolver for [`jest`](https://jestjs.io/) that uses the same strategy as TS when resolving files with JavaScript extensions (".js", ".jsx", ".cjs" and ".mjs"). It works pretty well with [`ts-jest`](https://kulshekhar.github.io/ts-jest/) or [`babel`](https://babeljs.io/) with [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript).

- 📦 Distributions in ESM and CommonJS.
  - Supports both Node.js ESM (import/export) and CommonJS (require/module.exports).
- ⚡ Lightweight:
  - It's bundled using rollup.js.
- 🔋 Bateries included:
  - It just depends on `jest-resolver` types.
- ✅ Safe:
  - Made with ESLint, TypeScript as strict as possible.
  - Unit tests with Jest.
  - Like `ts-jest`, `ts-jest-resolver` [uses itself as jest's resolver](https://github.com/VitorLuizC/ts-jest-resolver/commit/a2cc8f6482250380c2c735bf8827eb64082d5ef6).

## Usage

This library is published in the NPM registry and can be installed using any compatible package manager.

```sh
npm install ts-jest-resolver --save

# For Yarn, use the command below.
yarn add ts-jest-resolver
```

After installation, you can set `"ts-jest-resolver"` as jest's resolver.

```js
// jest.config.js

module.exports = {
  preset: "ts-jest",
  resolver: "ts-jest-resolver",
};
```

## How it works

It changes module's extension to resolve in the same way as TypeScript.

### How it works with ".js" and ".jsx" extensions

When importing from path with JavaScript extension (".js" or ".jsx"):

```js
import EventEmitter from './EventEmitter.js';
```

1. It tries to resolve to a path with ".tsx";

   ```js
   import EventEmitter from './EventEmitter.tsx';
   ```

2. If no file was found, it tries to resolve to a path with ".ts";

   ```js
   import EventEmitter from './EventEmitter.ts';
   ```

3. If no file was found, it resolves to original path (with ".js" or ".jsx").

   ```js
   import EventEmitter from './EventEmitter.js';
   ```

### How it works with ".mjs" and ".cjs" extensions

When importing from path with ES or CommonJS modules (".mjs" and ".cjs" respectively):

Ex.
```ts
import parse, { Tokenizer } from './parser.mjs'
import { discoverPath } from './getFiles.cjs';
```

1. It tries to resolve to paths with ".mts" and ".cts".

   Ex.

   ```ts
   import parse, { Tokenizer } from './parser.mts'
   import { discoverPath } from './getFiles.cts';
   ```

2. If no files were found, it resolves to original paths (with ".mjs" and ".cjs").

   Ex.

   ```ts
   import parse, { Tokenizer } from './parser.mjs'
   import { discoverPath } from './getFiles.cjs';
   ```



## License

Released under [MIT License](./LICENSE).
