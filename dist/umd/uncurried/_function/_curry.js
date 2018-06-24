(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../_jsPlatform/_jsPlatform', '../_object/_utils'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../_jsPlatform/_jsPlatform'), require('../_object/_utils'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._jsPlatform, global._utils);
        global._curry = mod.exports;
    }
})(this, function (exports, _jsPlatform, _utils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.curry5 = exports.curry4 = exports.curry3 = exports.curry2 = exports.curryN = exports.curry = undefined;
    /**
     * @author elydelacruz
     * @created 12/6/2016.
     * @memberOf _function
     * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
     */
    var notFnErrPrefix = '`fn` in `curry(fn, ...args)`';

    var

    /**
     * Curries a function based on it's defined arity (argument's arrayOps expected length).
     * @function module:_function.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = exports.curry = function curry(fn) {
        for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            argsToCurry[_key - 1] = arguments[_key];
        }

        return curryN.apply(undefined, [(0, _utils.fnOrError)(notFnErrPrefix, fn).length, fn].concat(argsToCurry));
    },


    /**
     * Curries a function up to a given arity.
     * @function module:_function.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */
    curryN = exports.curryN = function curryN(executeArity, fn) {
        for (var _len2 = arguments.length, curriedArgs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            curriedArgs[_key2 - 2] = arguments[_key2];
        }

        return function () {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            var concatedArgs = (0, _jsPlatform.concat)(curriedArgs, args),
                canBeCalled = (0, _jsPlatform.length)(concatedArgs) >= executeArity || !executeArity;
            return !canBeCalled ? (0, _jsPlatform.apply)(curryN, (0, _jsPlatform.concat)([executeArity, (0, _utils.fnOrError)(notFnErrPrefix, fn)], concatedArgs)) : (0, _jsPlatform.apply)((0, _utils.fnOrError)(notFnErrPrefix, fn), concatedArgs);
        };
    },


    /**
     * Curries a _function up to an arity of 2 (won't call _function until 2 or more args).
     * @function module:_function.curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = exports.curry2 = function curry2(fn) {
        return curryN(2, fn);
    },


    /**
     * Curries a _function up to an arity of 3 (won't call _function until 3 or more args).
     * @function module:_function.curry3
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = exports.curry3 = function curry3(fn) {
        return curryN(3, fn);
    },


    /**
     * Curries a _function up to an arity of 4 (won't call _function until 4 or more args).
     * @function module:_function.curry4
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = exports.curry4 = function curry4(fn) {
        return curryN(4, fn);
    },


    /**
     * Curries a _function up to an arity of 5 (won't call _function until 5 or more args).
     * @function module:_function.curry5
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = exports.curry5 = function curry5(fn) {
        return curryN(5, fn);
    };
});