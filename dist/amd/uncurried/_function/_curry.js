define(['exports', '../_jsPlatform/_jsPlatform', '../_object/_utils'], function (exports, _jsPlatform, _utils) {
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
    const notFnErrPrefix = '`fn` in `curry(fn, ...args)`';

    const

    /**
     * Curries a function based on it's defined arity (argument's arrayOps expected length).
     * @function module:_function.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = exports.curry = (fn, ...argsToCurry) => curryN((0, _utils.fnOrError)(notFnErrPrefix, fn).length, fn, ...argsToCurry),


    /**
     * Curries a function up to a given arity.
     * @function module:_function.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */
    curryN = exports.curryN = (executeArity, fn, ...curriedArgs) => {
        return (...args) => {
            let concatedArgs = (0, _jsPlatform.concat)(curriedArgs, args),
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
    curry2 = exports.curry2 = fn => curryN(2, fn),


    /**
     * Curries a _function up to an arity of 3 (won't call _function until 3 or more args).
     * @function module:_function.curry3
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = exports.curry3 = fn => curryN(3, fn),


    /**
     * Curries a _function up to an arity of 4 (won't call _function until 4 or more args).
     * @function module:_function.curry4
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = exports.curry4 = fn => curryN(4, fn),


    /**
     * Curries a _function up to an arity of 5 (won't call _function until 5 or more args).
     * @function module:_function.curry5
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = exports.curry5 = fn => curryN(5, fn);
});