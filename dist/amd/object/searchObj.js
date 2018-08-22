define(['exports', './is', '../function/curry'], function (exports, _is, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.searchObj = undefined;
    const

    /**
     * Gives you value at key/namespace-key within `obj`;  E.g.,
     * searchObj('all.your.base', {all: {your: {base: 99}}}) === 99 // `true`
     * @note If key is unreachable (undefined) returns `undefined`.
     *  Useful in cases where we do not want to check each key along the way before getting/checking value;  E.g.,
     * @example
     * ```
     * if (obj && obj.all && obj.all.your && obj.all.your.base) {
     *   // Thing we want to do
     * }
     *
     * // So with our function becomes
     * if (searchObj('all.your.base', obj)) {
     *   // Thing we want to do
     * }
     * ```
     * @function module:object.searchObj
     * @param nsString {String}
     * @param obj {*}
     * @returns {*}
     */
    searchObj = exports.searchObj = (0, _curry.curry)((nsString, obj) => {
        if (!obj) {
            return obj;
        }
        if (nsString.indexOf('.') === -1) {
            return obj[nsString];
        }
        const parts = nsString.split('.'),
              limit = parts.length;
        let ind = 0,
            parent = obj;
        for (; ind < limit; ind += 1) {
            const node = parent[parts[ind]];
            if (!(0, _is.isset)(node)) {
                return node;
            }
            parent = node;
        }
        return parent;
    });
});