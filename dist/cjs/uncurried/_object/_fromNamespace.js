'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._fromNamespace = undefined;

var _is = require('./_is');

var

/**
 * Gives you value at key/namespace-key;  E.g.,
 * ```
 *   _fromNamespace('all.your.base', {all: {your: {base: 99}}}) === 99
 * ```
 * @function module:object._fromNamespace
 * @param nsString {String}
 * @param obj {*}
 * @returns {*}
 */
_fromNamespace = exports._fromNamespace = function _fromNamespace(nsString, obj) {
    if (!obj) {
        return obj;
    }
    if (nsString.indexOf('.') === -1) {
        return obj[nsString];
    }
    var parts = nsString.split('.'),
        limit = parts.length;
    var ind = 0,
        parent = obj;
    for (; ind < limit; ind += 1) {
        var node = parent[parts[ind]];
        if (!(0, _is.isset)(node)) {
            return node;
        }
        parent = node;
    }
    return parent;
};