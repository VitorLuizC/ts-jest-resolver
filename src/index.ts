import defaultResolver from 'jest-resolve/build/defaultResolver';

/**
 * A `RegExp` that checks if file name has JavaScript extension.
 */
const JAVASCRIPT_EXTENSION = /\.js$/i;

/**
 * A list of TypeScript file extensions, in the order used by its resolver.
 */
const TYPESCRIPT_EXTENSIONS = ['.ts', '.tsx'];

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
  const resolver = options.defaultResolver || defaultResolver;

  if (JAVASCRIPT_EXTENSION.test(path)) {
    for (const extension of TYPESCRIPT_EXTENSIONS) {
      try {
        return resolver(path.replace(JAVASCRIPT_EXTENSION, extension), options);
      } catch {
        continue;
      }
    }
  }

  return resolver(path, options);
}

export default resolverForTSJest;
