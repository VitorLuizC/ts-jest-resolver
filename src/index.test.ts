import resolverForTSJest, { Path, ResolverOptions } from './index.js';

const defaultResolver = jest.fn<Path, [Path, ResolverOptions]>();

const DEFAULT_OPTIONS: ResolverOptions = {
  basedir: '/usr/src/app',
  defaultResolver,
};

function identity<TValue>(value: TValue): TValue {
  return value;
}

function throwFileNotFound(): never {
  throw new Error('ENOENT');
}

describe('resolverForTSJest', () => {
  const path = {
    withCJS: './file.cjs',
    withCTS: './file.cts',
    withJS: './file.js',
    withJSX: './file.jsx',
    withMJS: './file.mjs',
    withMTS: './file.mts',
    withTS: './file.ts',
    withTSX: './file.tsx',
  } as const;

  beforeEach(() => {
    defaultResolver.mockReset();
  });

  describe('when receives a path with ".js"', () => {
    it('tries to resolve ".ts", then ".tsx" and ".js"', () => {
      defaultResolver
        .mockImplementationOnce(throwFileNotFound)
        .mockImplementationOnce(throwFileNotFound)
        .mockImplementationOnce(identity);

      const result = resolverForTSJest(path.withJS, DEFAULT_OPTIONS);

      expect(defaultResolver).toHaveBeenNthCalledWith(
        1,
        path.withTS,
        DEFAULT_OPTIONS,
      );

      expect(defaultResolver).toHaveBeenNthCalledWith(
        2,
        path.withTSX,
        DEFAULT_OPTIONS,
      );

      expect(defaultResolver).toHaveBeenNthCalledWith(
        3,
        path.withJS,
        DEFAULT_OPTIONS,
      );

      expect(result).toBe(path.withJS);
    });
  });

  describe('when receives a path with ".jsx"', () => {
    it('tries to resolve ".ts", then ".tsx", then ".js" and ".jsx"', () => {
      defaultResolver
        .mockImplementationOnce(throwFileNotFound)
        .mockImplementationOnce(throwFileNotFound)
        .mockImplementationOnce(throwFileNotFound)
        .mockImplementationOnce(identity);

      const result = resolverForTSJest(path.withJSX, DEFAULT_OPTIONS);

      expect(defaultResolver).toHaveBeenNthCalledWith(
        1,
        path.withTS,
        DEFAULT_OPTIONS,
      );

      expect(defaultResolver).toHaveBeenNthCalledWith(
        2,
        path.withTSX,
        DEFAULT_OPTIONS,
      );

      expect(defaultResolver).toHaveBeenNthCalledWith(
        3,
        path.withJS,
        DEFAULT_OPTIONS,
      );

      expect(defaultResolver).toHaveBeenNthCalledWith(
        4,
        path.withJSX,
        DEFAULT_OPTIONS,
      );

      expect(result).toBe(path.withJSX);
    });
  });

  describe('when receives a path with ".mjs"', () => {
    it('tries to resolve ".mts" and ".mjs"', () => {
      defaultResolver
        .mockImplementationOnce(throwFileNotFound)
        .mockImplementationOnce(identity);

      const result = resolverForTSJest(path.withMJS, DEFAULT_OPTIONS);

      expect(defaultResolver).toHaveBeenNthCalledWith(
        1,
        path.withMTS,
        DEFAULT_OPTIONS,
      );

      expect(defaultResolver).toHaveBeenNthCalledWith(
        2,
        path.withMJS,
        DEFAULT_OPTIONS,
      );

      expect(result).toBe(path.withMJS);
    });
  });

  describe('when receives a path with ".cjs"', () => {
    it('tries to resolve ".cts" and ".cjs"', () => {
      defaultResolver
        .mockImplementationOnce(throwFileNotFound)
        .mockImplementationOnce(identity);

      const result = resolverForTSJest(path.withCJS, DEFAULT_OPTIONS);

      expect(defaultResolver).toHaveBeenNthCalledWith(
        1,
        path.withCTS,
        DEFAULT_OPTIONS,
      );

      expect(defaultResolver).toHaveBeenNthCalledWith(
        2,
        path.withCJS,
        DEFAULT_OPTIONS,
      );

      expect(result).toBe(path.withCJS);
    });
  });

  describe('when receives a path without ".js", ".jsx", ".cjs" or ".mjs" extension', () => {
    it('resolves with received path', () => {
      defaultResolver.mockImplementationOnce(identity);

      const result = resolverForTSJest('template.ejs', DEFAULT_OPTIONS);

      expect(defaultResolver).toBeCalledTimes(1);
      expect(defaultResolver).toBeCalledWith('template.ejs', DEFAULT_OPTIONS);
      expect(result).toBe('template.ejs');
    });
  });

  describe("when can't resolve path", () => {
    beforeEach(() => {
      defaultResolver.mockImplementation(throwFileNotFound);
    });

    it('keeps default resolver behavior', () => {
      expect(() => {
        resolverForTSJest(path.withJS, DEFAULT_OPTIONS);
      }).toThrowError('ENOENT');
    });
  });
});
