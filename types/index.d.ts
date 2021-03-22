import defaultResolver from 'jest-resolve/build/defaultResolver';
export declare type Path = Parameters<typeof defaultResolver>[0];
export declare type ResolverOptions = Parameters<typeof defaultResolver>[1];
/**
 * A resolver for `jest` that uses same strategy as TS when resolving files with
 * JavaScript extension (".js"). Otherwise it just uses default resolver.
 *
 * When receives a path with JavaScript extension (".js"):
 * 1. It tries to resolve to a path with ".ts".
 * 2. If no file was found, it tries to resolve to a path with ".tsx".
 * 3. If no file was found, it resolves to original path (with ".js").
 */
declare function resolverForTSJest(path: Path, options: ResolverOptions): Path;
export default resolverForTSJest;
//# sourceMappingURL=index.d.ts.map