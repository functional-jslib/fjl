(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './is', '../function/curry'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./is'), require('../function/curry'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.is, global.curry);
        global.fromNamespace = mod.exports;
    }
})(this, function (exports, _is, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.fromNamespace = undefined;
    var

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
    fromNamespace = exports.fromNamespace = (0, _curry.curry)(function (nsString, obj) {
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
    });
});