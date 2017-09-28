/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @module curry
 * @description Curry strict and curry arbitrarily functions `curry` and `curryN`.
 */

import {apply} from './apply';

import {append, length} from   '../listOps/listOpsUncurried';

export const

    /**
     * Curries a functionOps based on it's defined arity (argument's arrayOps expected length).
     * @function curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = (fn, ...argsToCurry) => {
        return (...args) => {
            const concatedArgs = append(argsToCurry, args);
            return length(concatedArgs) < length(fn) ?
                apply(curry, append([fn], concatedArgs)) :
                apply(fn, concatedArgs);
        };
    },

    /**
     * Curries a functionOps up to a given arity.
     * @function curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */
    curryN = (executeArity, fn, ...curriedArgs) => {
        return (...args) => {
            let concatedArgs = append(curriedArgs, args),
                canBeCalled = (length(concatedArgs) >= executeArity) || !executeArity;
            return !canBeCalled ? apply(curryN, append([executeArity, fn], concatedArgs)) :
                apply(fn, concatedArgs);
        };
    },

    /**
     * Curries a functionOps up to an arity of 2 (won't call functionOps until 2 or more args).
     * @function curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = fn => curryN(2, fn),

    /**
     * Curries a functionOps up to an arity of 3 (won't call functionOps until 3 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = fn => curryN(3, fn),

    /**
     * Curries a functionOps up to an arity of 4 (won't call functionOps until 4 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = fn => curryN(4, fn),

    /**
     * Curries a functionOps up to an arity of 5 (won't call functionOps until 5 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = fn => curryN(5, fn);
