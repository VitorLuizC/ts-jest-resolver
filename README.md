# ts-jest-resolver

[![Build Status](https://travis-ci.org/VitorLuizC/ts-jest-resolver.svg?branch=master)](https://travis-ci.org/VitorLuizC/ts-jest-resolver)
[![License](https://badgen.net/github/license/VitorLuizC/ts-jest-resolver)](./LICENSE)

A resolver for [`jest`](https://jestjs.io/) that uses the same strategy as TS when resolving files with JavaScript extension (".js"). It works pretty well with [`ts-jest`](https://kulshekhar.github.io/ts-jest/) or [`babel`](https://babeljs.io/) with [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript).

- 📦 Distributions in ESM and CommonJS.
  - Supports both Node.js ESM (import/export) and CommonJS (require/module.exports).
- ⚡ Lightweight:
  - It's bundled using rollup.js.
- 🔋 Bateries included:
  - No dependencies, it just uses `jest-resolve` (which is already a jest dependency).
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

It just changes module resolution when the import statement has ".js" extension:

Ex.
```ts
import EventEmitter from './EventEmitter.js';
```

1. It tries to resolve the import path with ".ts" instead of ".js".

   Ex.

   ```ts
   import EventEmitter from './EventEmitter.ts';
   ```

2. If the module wasn't found, it tries to resolve the import path with ".tsx" instead of ".js".

   Ex.

   ```ts
   import EventEmitter from './EventEmitter.tsx';
   ```

3. If the module wasn't found, it resolves to the original import path (with ".js").

   Ex.

   ```ts
   import EventEmitter from './EventEmitter.js';
   ```

## License

Released under [MIT License](./LICENSE).
