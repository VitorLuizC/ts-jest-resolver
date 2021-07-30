import resolverForTSJest, { Path, ResolverOptions } from './index.js';
import defaultResolver from 'jest-resolve/build/defaultResolver';

jest.mock('jest-resolve/build/defaultResolver');

const defaultResolverMock = defaultResolver as unknown as jest.Mock<
  Path,
  [Path, ResolverOptions]
>;

const DEFAULT_OPTIONS: ResolverOptions = {
  basedir: '/usr/src/app',
  defaultResolver,
};

describe('resolverForTSJest', () => {
  beforeEach(() => {
    defaultResolverMock.mockReset();
  });

  describe('when path has ".js" extension', () => {
    const PATH_WITH_JS = './lib/formatToBRL.js';
    const PATH_WITH_TS = './lib/formatToBRL.ts';
    const PATH_WITH_TSX = './lib/formatToBRL.tsx';

    describe('and the module has ".ts" extension', () => {
      beforeEach(() => {
        defaultResolverMock.mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".ts" extension', () => {
        resolverForTSJest(PATH_WITH_JS, DEFAULT_OPTIONS);

        expect(defaultResolverMock).toHaveBeenCalledWith(
          PATH_WITH_TS,
          DEFAULT_OPTIONS,
        );
      });

      it('resolves to the module with ".ts" extension', () => {
        const result = resolverForTSJest(PATH_WITH_JS, DEFAULT_OPTIONS);

        expect(result).toBe(PATH_WITH_TS);
      });
    });

    describe('and the module has ".tsx" extension', () => {
      beforeEach(() => {
        defaultResolverMock
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".ts" and them ".tsx" extension', () => {
        resolverForTSJest(PATH_WITH_JS, DEFAULT_OPTIONS);

        expect(defaultResolverMock).toHaveBeenNthCalledWith(
          1,
          PATH_WITH_TS,
          DEFAULT_OPTIONS,
        );

        expect(defaultResolverMock).toHaveBeenNthCalledWith(
          2,
          PATH_WITH_TSX,
          DEFAULT_OPTIONS,
        );
      });

      it('resolves to the module with ".tsx" extension', () => {
        const result = resolverForTSJest(PATH_WITH_JS, DEFAULT_OPTIONS);

        expect(result).toBe(PATH_WITH_TSX);
      });
    });

    describe('and there are no module with ".ts" or ".tsx" extension', () => {
      beforeEach(() => {
        defaultResolverMock
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".ts", ".tsx" and them ".js" extension', () => {
        resolverForTSJest(PATH_WITH_JS, DEFAULT_OPTIONS);

        expect(defaultResolverMock).toHaveBeenNthCalledWith(
          1,
          PATH_WITH_TS,
          DEFAULT_OPTIONS,
        );

        expect(defaultResolverMock).toHaveBeenNthCalledWith(
          2,
          PATH_WITH_TSX,
          DEFAULT_OPTIONS,
        );

        expect(defaultResolverMock).toHaveBeenNthCalledWith(
          3,
          PATH_WITH_JS,
          DEFAULT_OPTIONS,
        );
      });

      it('resolves to the module with ".js" extension', () => {
        const result = resolverForTSJest(PATH_WITH_JS, DEFAULT_OPTIONS);

        expect(result).toBe(PATH_WITH_JS);
      });
    });

    describe('and there are no module at all', () => {
      beforeEach(() => {
        defaultResolverMock
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          });
      });

      it('let defaultResolver throw its error', () => {
        expect(() => {
          resolverForTSJest(PATH_WITH_JS, DEFAULT_OPTIONS);
        }).toThrowError('ENOENT');
      });
    });
  });

  describe('when path don\'t have ".js" extension', () => {
    const PATH_WITHOUT_JS = 'react';

    it('resolves with received path', () => {
      defaultResolverMock.mockImplementationOnce((path) => path);

      const result = resolverForTSJest(PATH_WITHOUT_JS, DEFAULT_OPTIONS);

      expect(defaultResolverMock).toBeCalledTimes(1);
      expect(defaultResolverMock).toBeCalledWith(
        PATH_WITHOUT_JS,
        DEFAULT_OPTIONS,
      );
      expect(result).toBe(PATH_WITHOUT_JS);
    });
  });
});
