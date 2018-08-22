(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './fnOrError'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./fnOrError'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.fnOrError);
        global.curry = mod.exports;
    }
})(this, function (exports, _fnOrError) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.curry5 = exports.curry4 = exports.curry3 = exports.curry2 = exports.curry = exports.curryN = exports.curryNotFnErrPrefix = undefined;


    /**
     * @author elydelacruz
     * @created 12/6/2016.
     * @memberOf function
     * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
     */

    var

    /**
     * @private
     * @type {string}
     */
    curryNotFnErrPrefix = exports.curryNotFnErrPrefix = '`fn` in `curry(fn, ...args)`',


    /**
     * Curries a function up to a given arity.
     * @function module:function.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */
    curryN = exports.curryN = function curryN(executeArity, fn) {
        for (var _len = arguments.length, curriedArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            curriedArgs[_key - 2] = arguments[_key];
        }

        return function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var concatedArgs = curriedArgs.concat(args),
                canBeCalled = concatedArgs.length >= executeArity || !executeArity;
            return !canBeCalled ? curryN.apply(null, [executeArity, (0, _fnOrError.fnOrError)(curryNotFnErrPrefix, fn)].concat(concatedArgs)) : (0, _fnOrError.fnOrError)(curryNotFnErrPrefix, fn).apply(null, concatedArgs);
        };
    },


    /**
     * Curries a function based on it's defined arity (argument's arrayOps expected length).
     * @function module:function.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = exports.curry = function curry(fn) {
        for (var _len3 = arguments.length, argsToCurry = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            argsToCurry[_key3 - 1] = arguments[_key3];
        }

        return curryN.apply(undefined, [(0, _fnOrError.fnOrError)(curryNotFnErrPrefix, fn).length, fn].concat(argsToCurry));
    },


    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @function module:function.curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = exports.curry2 = function curry2(fn) {
        return curryN(2, fn);
    },


    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @function module:function.curry3
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = exports.curry3 = function curry3(fn) {
        return curryN(3, fn);
    },


    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @function module:function.curry4
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = exports.curry4 = function curry4(fn) {
        return curryN(4, fn);
    },


    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @function module:function.curry5
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = exports.curry5 = function curry5(fn) {
        return curryN(5, fn);
    };
});