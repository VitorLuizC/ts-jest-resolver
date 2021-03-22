/*!
 * ts-jest-resolver v0.0.0
 * (c) Vitor Luiz Cavalcanti
 * Released under the MIT License.
 */

'use strict';

var defaultResolver = require('jest-resolve/build/defaultResolver');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var defaultResolver__default = /*#__PURE__*/_interopDefaultLegacy(defaultResolver);

/**
 * A `RegExp` that checks if file name has JavaScript extension.
 */
var JAVASCRIPT_EXTENSION = /\.js$/i;
/**
 * A list of TypeScript file extensions, in the order used by its resolver.
 */
var TYPESCRIPT_EXTENSIONS = ['.ts', '.tsx'];
/**
 * A resolver for `jest` that uses same strategy as TS when resolving files with
 * JavaScript extension (".js"). Otherwise it just uses default resolver.
 *
 * When receives a path with JavaScript extension (".js"):
 * 1. It tries to resolve to a path with ".ts".
 * 2. If no file was found, it tries to resolve to a path with ".tsx".
 * 3. If no file was found, it resolves to original path (with ".js").
 */
function resolverForTSJest(path, options) {
    var resolver = options.defaultResolver || defaultResolver__default['default'];
    if (JAVASCRIPT_EXTENSION.test(path)) {
        for (var _i = 0, TYPESCRIPT_EXTENSIONS_1 = TYPESCRIPT_EXTENSIONS; _i < TYPESCRIPT_EXTENSIONS_1.length; _i++) {
            var extension = TYPESCRIPT_EXTENSIONS_1[_i];
            try {
                return resolver(path.replace(JAVASCRIPT_EXTENSION, extension), options);
            }
            catch (_a) {
                continue;
            }
        }
    }
    return resolver(path, options);
}

module.exports = resolverForTSJest;
//# sourceMappingURL=index.js.map
