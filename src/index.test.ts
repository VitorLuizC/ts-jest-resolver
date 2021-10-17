import resolverForTSJest, { Path, ResolverOptions } from './index.js';

const defaultResolver = jest.fn<Path, [Path, ResolverOptions]>();

const DEFAULT_OPTIONS: ResolverOptions = {
  basedir: '/usr/src/app',
  defaultResolver,
};

describe('resolverForTSJest', () => {
  beforeEach(() => {
    defaultResolver.mockReset();
  });

  describe('when path has ".js" extension', () => {
    const PATH_WITH_JS = './lib/formatToBRL.js';
    const PATH_WITH_TS = './lib/formatToBRL.ts';
    const PATH_WITH_TSX = './lib/formatToBRL.tsx';

    describe('and the module has ".tsx" extension', () => {
      beforeEach(() => {
        defaultResolver.mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".tsx" extension', () => {
        resolverForTSJest(PATH_WITH_JS, DEFAULT_OPTIONS);

        expect(defaultResolver).toHaveBeenCalledWith(
          PATH_WITH_TSX,
          DEFAULT_OPTIONS,
        );
      });

      it('resolves to the module with ".tsx" extension', () => {
        const result = resolverForTSJest(PATH_WITH_JS, DEFAULT_OPTIONS);

        expect(result).toBe(PATH_WITH_TSX);
      });
    });

    describe('and the module has ".ts" extension', () => {
      beforeEach(() => {
        defaultResolver
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".tsx" and them ".ts" extension', () => {
        resolverForTSJest(PATH_WITH_JS, DEFAULT_OPTIONS);

        expect(defaultResolver).toHaveBeenNthCalledWith(
          1,
          PATH_WITH_TSX,
          DEFAULT_OPTIONS,
        );

        expect(defaultResolver).toHaveBeenNthCalledWith(
          2,
          PATH_WITH_TS,
          DEFAULT_OPTIONS,
        );
      });

      it('resolves to the module with ".ts" extension', () => {
        const result = resolverForTSJest(PATH_WITH_JS, DEFAULT_OPTIONS);

        expect(result).toBe(PATH_WITH_TS);
      });
    });

    describe('and there are no module with ".tsx" or ".ts" extension', () => {
      beforeEach(() => {
        defaultResolver
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".tsx", ".ts" and them ".js" extension', () => {
        resolverForTSJest(PATH_WITH_JS, DEFAULT_OPTIONS);

        expect(defaultResolver).toHaveBeenNthCalledWith(
          1,
          PATH_WITH_TSX,
          DEFAULT_OPTIONS,
        );

        expect(defaultResolver).toHaveBeenNthCalledWith(
          2,
          PATH_WITH_TS,
          DEFAULT_OPTIONS,
        );

        expect(defaultResolver).toHaveBeenNthCalledWith(
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
        defaultResolver
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

  describe('when path has ".jsx" extension', () => {
    const PATH_WITH_JSX = './lib/formatToBRL.jsx';
    const PATH_WITH_TS = './lib/formatToBRL.ts';
    const PATH_WITH_TSX = './lib/formatToBRL.tsx';

    describe('and the module has ".tsx" extension', () => {
      beforeEach(() => {
        defaultResolver.mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".tsx" extension', () => {
        resolverForTSJest(PATH_WITH_JSX, DEFAULT_OPTIONS);

        expect(defaultResolver).toHaveBeenCalledWith(
          PATH_WITH_TSX,
          DEFAULT_OPTIONS,
        );
      });

      it('resolves to the module with ".tsx" extension', () => {
        const result = resolverForTSJest(PATH_WITH_JSX, DEFAULT_OPTIONS);

        expect(result).toBe(PATH_WITH_TSX);
      });
    });

    describe('and the module has ".ts" extension', () => {
      beforeEach(() => {
        defaultResolver
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".tsx" and them ".ts" extension', () => {
        resolverForTSJest(PATH_WITH_JSX, DEFAULT_OPTIONS);

        expect(defaultResolver).toHaveBeenNthCalledWith(
          1,
          PATH_WITH_TSX,
          DEFAULT_OPTIONS,
        );

        expect(defaultResolver).toHaveBeenNthCalledWith(
          2,
          PATH_WITH_TS,
          DEFAULT_OPTIONS,
        );
      });

      it('resolves to the module with ".ts" extension', () => {
        const result = resolverForTSJest(PATH_WITH_JSX, DEFAULT_OPTIONS);

        expect(result).toBe(PATH_WITH_TS);
      });
    });

    describe('and there are no module with ".ts" or ".tsx" extension', () => {
      beforeEach(() => {
        defaultResolver
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".ts", ".tsx" and them ".jsx" extension', () => {
        resolverForTSJest(PATH_WITH_JSX, DEFAULT_OPTIONS);

        expect(defaultResolver).toHaveBeenNthCalledWith(
          1,
          PATH_WITH_TSX,
          DEFAULT_OPTIONS,
        );

        expect(defaultResolver).toHaveBeenNthCalledWith(
          2,
          PATH_WITH_TS,
          DEFAULT_OPTIONS,
        );

        expect(defaultResolver).toHaveBeenNthCalledWith(
          3,
          PATH_WITH_JSX,
          DEFAULT_OPTIONS,
        );
      });

      it('resolves to the module with ".jsx" extension', () => {
        const result = resolverForTSJest(PATH_WITH_JSX, DEFAULT_OPTIONS);

        expect(result).toBe(PATH_WITH_JSX);
      });
    });

    describe('and there are no module at all', () => {
      beforeEach(() => {
        defaultResolver
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
          resolverForTSJest(PATH_WITH_JSX, DEFAULT_OPTIONS);
        }).toThrowError('ENOENT');
      });
    });
  });

  describe('when path has ".mjs" extension', () => {
    const PATH_WITH_MJS = './lib/formatToBRL.mjs';
    const PATH_WITH_MTS = './lib/formatToBRL.mts';

    describe('and the module has ".mts" extension', () => {
      beforeEach(() => {
        defaultResolver.mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".mts" extension', () => {
        resolverForTSJest(PATH_WITH_MJS, DEFAULT_OPTIONS);

        expect(defaultResolver).toHaveBeenCalledWith(
          PATH_WITH_MTS,
          DEFAULT_OPTIONS,
        );
      });

      it('resolves to the module with ".mts" extension', () => {
        const result = resolverForTSJest(PATH_WITH_MJS, DEFAULT_OPTIONS);

        expect(result).toBe(PATH_WITH_MTS);
      });
    });

    describe('and there are no module with ".mts" extension', () => {
      beforeEach(() => {
        defaultResolver
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".mts" and them ".mjs" extension', () => {
        resolverForTSJest(PATH_WITH_MJS, DEFAULT_OPTIONS);

        expect(defaultResolver).toHaveBeenNthCalledWith(
          1,
          PATH_WITH_MTS,
          DEFAULT_OPTIONS,
        );

        expect(defaultResolver).toHaveBeenNthCalledWith(
          2,
          PATH_WITH_MJS,
          DEFAULT_OPTIONS,
        );
      });

      it('resolves to the module with ".mjs" extension', () => {
        const result = resolverForTSJest(PATH_WITH_MJS, DEFAULT_OPTIONS);

        expect(result).toBe(PATH_WITH_MJS);
      });
    });

    describe('and there are no module at all', () => {
      beforeEach(() => {
        defaultResolver
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          });
      });

      it('let defaultResolver throw its error', () => {
        expect(() => {
          resolverForTSJest(PATH_WITH_MJS, DEFAULT_OPTIONS);
        }).toThrowError('ENOENT');
      });
    });
  });

  describe('when path has ".cjs" extension', () => {
    const PATH_WITH_CJS = './lib/formatToBRL.cjs';
    const PATH_WITH_CTS = './lib/formatToBRL.cts';

    describe('and the module has ".cts" extension', () => {
      beforeEach(() => {
        defaultResolver.mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".cts" extension', () => {
        resolverForTSJest(PATH_WITH_CJS, DEFAULT_OPTIONS);

        expect(defaultResolver).toHaveBeenCalledWith(
          PATH_WITH_CTS,
          DEFAULT_OPTIONS,
        );
      });

      it('resolves to the module with ".cts" extension', () => {
        const result = resolverForTSJest(PATH_WITH_CJS, DEFAULT_OPTIONS);

        expect(result).toBe(PATH_WITH_CTS);
      });
    });

    describe('and there are no module with ".cts" extension', () => {
      beforeEach(() => {
        defaultResolver
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce((path) => path);
      });

      it('tries to resolve path with ".cts" and them ".cjs" extension', () => {
        resolverForTSJest(PATH_WITH_CJS, DEFAULT_OPTIONS);

        expect(defaultResolver).toHaveBeenNthCalledWith(
          1,
          PATH_WITH_CTS,
          DEFAULT_OPTIONS,
        );

        expect(defaultResolver).toHaveBeenNthCalledWith(
          2,
          PATH_WITH_CJS,
          DEFAULT_OPTIONS,
        );
      });

      it('resolves to the module with ".cjs" extension', () => {
        const result = resolverForTSJest(PATH_WITH_CJS, DEFAULT_OPTIONS);

        expect(result).toBe(PATH_WITH_CJS);
      });
    });

    describe('and there are no module at all', () => {
      beforeEach(() => {
        defaultResolver
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          })
          .mockImplementationOnce(() => {
            throw new Error('ENOENT');
          });
      });

      it('let defaultResolver throw its error', () => {
        expect(() => {
          resolverForTSJest(PATH_WITH_CJS, DEFAULT_OPTIONS);
        }).toThrowError('ENOENT');
      });
    });
  });

  describe('when path don\'t have ".js" extension', () => {
    const PATH_WITHOUT_JS = 'react';

    it('resolves with received path', () => {
      defaultResolver.mockImplementationOnce((path) => path);

      const result = resolverForTSJest(PATH_WITHOUT_JS, DEFAULT_OPTIONS);

      expect(defaultResolver).toBeCalledTimes(1);
      expect(defaultResolver).toBeCalledWith(PATH_WITHOUT_JS, DEFAULT_OPTIONS);
      expect(result).toBe(PATH_WITHOUT_JS);
    });
  });
});
