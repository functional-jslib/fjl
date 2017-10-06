(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './curry'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./curry'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry);
        global.until = mod.exports;
    }
})(this, function (exports, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.until = undefined;
    var

    /**
     * Run `operation` until predicate returns `true`.
     * @function module:functionOps.until
     * @param predicate {Function} :: a -> Boolean
     * @param operation {Function} :: a -> a
     * @param typeInstance {*} :: * - A monoidal zero or some starting point.
     * @returns {*} - What ever type `typeInstance` is
     */
    until = exports.until = (0, _curry.curry)(function (predicate, operation, typeInstance) {
        var result = typeInstance;
        while (!predicate(result)) {
            result = operation(result);
        }
        return result;
    }); /**
         * @memberOf functionOps
         */
});