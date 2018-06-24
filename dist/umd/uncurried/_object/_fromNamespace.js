(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './_is'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./_is'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._is);
        global._fromNamespace = mod.exports;
    }
})(this, function (exports, _is) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports._fromNamespace = undefined;
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
});