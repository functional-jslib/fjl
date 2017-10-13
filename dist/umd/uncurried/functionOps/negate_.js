(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../jsPlatform/function_', '../jsPlatform/array_'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../jsPlatform/function_'), require('../jsPlatform/array_'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.function_, global.array_);
        global.negate_ = mod.exports;
    }
})(this, function (exports, _function_, _array_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.negateFMany = exports.negateP = exports.negateF5 = exports.negateF4 = exports.negateF3 = exports.negateF = undefined;
    /**
     * @memberOf functionOps_
     */

    var negateF = exports.negateF = function negateF(fn) {
        return function (a, b) {
            return !fn(a, b);
        };
    },
        negateF3 = exports.negateF3 = function negateF3(fn) {
        return function (a, b, c) {
            return !fn(a, b, c);
        };
    },
        negateF4 = exports.negateF4 = function negateF4(fn) {
        return function (a, b, c, d) {
            return !fn(a, b, c, d);
        };
    },
        negateF5 = exports.negateF5 = function negateF5(fn) {
        return function (a, b, c, d, e) {
            return !fn(a, b, c, d, e);
        };
    },


    /**
     * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
     * @function module:functionOps_.negateP
     * @param fn {Function}
     * @returns {Function}
     */
    negateP = exports.negateP = negateF3,


    /**
     * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
     * @function module:functionOps_.negateFMany
     * @param fn {Function}
     * @returns {Function}
     */
    negateFMany = exports.negateFMany = function negateFMany(fn) {
        return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return !(0, _function_.apply)(fn, (0, _array_.reverse)(args));
        };
    };
});