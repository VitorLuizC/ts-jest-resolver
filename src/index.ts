import type defaultResolver from 'jest-resolve/build/defaultResolver';

type Resolution = {
  /**
   * A `RegExp` that checks if file name has a JavaScript extension.
   */
  matcher: RegExp;

  /**
   * A list of TypeScript file extensions, in the order used by its resolver.
   */
  extensions: string[];
};

const resolutions: Resolution[] = [
  {
    matcher: /\.js$/i,
    extensions: ['.ts', '.tsx'],
  },
  {
    matcher: /\.mjs$/i,
    extensions: ['.mts'],
  },
  {
    matcher: /\.cjs$/i,
    extensions: ['.cts'],
  },
];

export type Path = Parameters<typeof defaultResolver>[0];

export type ResolverOptions = Parameters<typeof defaultResolver>[1];

/**
 * A resolver for `jest` that uses same strategy as TS when resolving files with
 * JavaScript extension (".js"). Otherwise it just uses default resolver.
 *
 * When receives a path with JavaScript extension (".js"):
 * 1. It tries to resolve to a path with ".ts".
 * 2. If no file was found, it tries to resolve to a path with ".tsx".
 * 3. If no file was found, it resolves to original path (with ".js").
 */
function resolverForTSJest(path: Path, options: ResolverOptions): Path {
  const resolver = options.defaultResolver;

  const resolution = resolutions.find(({ matcher }) => matcher.test(path));

  if (resolution) {
    for (const extension of resolution.extensions) {
      try {
        return resolver(path.replace(resolution.matcher, extension), options);
      } catch {
        continue;
      }
    }
  }

  return resolver(path, options);
}

export default resolverForTSJest;
