define(['exports', './is', '../function/curry'], function (exports, _is, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.fromNamespace = undefined;
    const

    /**
     * Gives you value at key/namespace-key;  E.g.,
     * ```
     *   fromNamespace('all.your.base', {all: {your: {base: 99}}}) === 99
     * ```
     * @function module:object.fromNamespace
     * @param nsString {String}
     * @param obj {*}
     * @returns {*}
     */
    fromNamespace = exports.fromNamespace = (0, _curry.curry)((nsString, obj) => {
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