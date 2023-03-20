import type { ResolverOptions } from 'jest-resolve';

export type Path = string;

export type { ResolverOptions };

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
    matcher: /\.jsx$/i,
    extensions: ['.ts', '.tsx', '.js'],
  },
  {
    matcher: /\.cjs$/i,
    extensions: ['.cts'],
  },
  {
    matcher: /\.mjs$/i,
    extensions: ['.mts'],
  },
];

/**
 * A resolver for `jest` that uses same strategy as TS when resolving files with
 * JavaScript extension (".js"). Otherwise it just uses default resolver.
 *
 * When receives a path with JavaScript extension (".js" or ".jsx"):
 * 1. It tries to resolve to a path with ".tsx".
 * 2. If no file was found, it tries to resolve to a path with ".ts".
 * 3. If no file was found, it resolves to original path (with ".js" or ".jsx").
 *
 * When receives a path with ES modules extension (".mjs"):
 * 1. It tries to resolve to a path with ".mts".
 * 2. If no file was found, it resolves to original path (with ".mjs").
 *
 * When receives a path with CommonJS modules extension (".cjs"):
 * 1. It tries to resolve to a path with ".cts".
 * 2. If no file was found, it resolves to original path (with ".cjs").
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
