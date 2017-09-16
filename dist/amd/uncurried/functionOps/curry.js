define(['exports', './apply', '../listOps/listOpsUncurried'], function (exports, _apply, _listOpsUncurried) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.curry5 = exports.curry4 = exports.curry3 = exports.curry2 = exports.curryN = exports.curry = undefined;
    /**
     * @author elydelacruz
     * @created 12/6/2016.
     * @module curry
     * @description Curry strict and curry arbitrarily functions `curry` and `curryN`.
     */

    const

    /**
     * Curries a functionOps based on it's defined arity (argument's arrayOps expected length).
     * @functionOps curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = exports.curry = (fn, ...argsToCurry) => {
        return (...args) => {
            const concatedArgs = (0, _listOpsUncurried.append)(argsToCurry, args);
            return (0, _listOpsUncurried.length)(concatedArgs) < (0, _listOpsUncurried.length)(fn) ? (0, _apply.apply)(curry, (0, _listOpsUncurried.append)([fn], concatedArgs)) : (0, _apply.apply)(fn, concatedArgs);
        };
    },


    /**
     * Curries a functionOps up to a given arity.
     * @functionOps curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */
    curryN = exports.curryN = (executeArity, fn, ...curriedArgs) => {
        return (...args) => {
            let concatedArgs = (0, _listOpsUncurried.append)(curriedArgs, args),
                canBeCalled = (0, _listOpsUncurried.length)(concatedArgs) >= executeArity || !executeArity;
            return !canBeCalled ? (0, _apply.apply)(curryN, (0, _listOpsUncurried.append)([executeArity, fn], concatedArgs)) : (0, _apply.apply)(fn, concatedArgs);
        };
    },


    /**
     * Curries a functionOps up to an arity of 2 (won't call functionOps until 2 or more args).
     * @functionOps curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = exports.curry2 = fn => curryN(2, fn),


    /**
     * Curries a functionOps up to an arity of 3 (won't call functionOps until 3 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = exports.curry3 = fn => curryN(3, fn),


    /**
     * Curries a functionOps up to an arity of 4 (won't call functionOps until 4 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = exports.curry4 = fn => curryN(4, fn),


    /**
     * Curries a functionOps up to an arity of 5 (won't call functionOps until 5 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = exports.curry5 = fn => curryN(5, fn);
});