/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @memberOf _functionOps
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */
import {apply, length, concat} from '../_jsPlatform';
export const

    /**
     * Curries a functionOps based on it's defined arity (argument's arrayOps expected length).
     * @function module:_functionOps.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = (fn, ...argsToCurry) => {
        return (...args) => {
            const concatedArgs = concat(argsToCurry, args);
            return length(concatedArgs) < length(fn) ?
                apply(curry, concat([fn], concatedArgs)) :
                apply(fn, concatedArgs);
        };
    },

    /**
     * Curries a functionOps up to a given arity.
     * @function module:_functionOps.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */
    curryN = (executeArity, fn, ...curriedArgs) => {
        return (...args) => {
            let concatedArgs = concat(curriedArgs, args),
                canBeCalled = (length(concatedArgs) >= executeArity) || !executeArity;
            return !canBeCalled ? apply(curryN, concat([executeArity, fn], concatedArgs)) :
                apply(fn, concatedArgs);
        };
    },

    /**
     * Curries a _functionOps up to an arity of 2 (won't call _functionOps until 2 or more args).
     * @function module:_functionOps.curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = fn => curryN(2, fn),

    /**
     * Curries a _functionOps up to an arity of 3 (won't call _functionOps until 3 or more args).
     * @function module:_functionOps.curry3
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = fn => curryN(3, fn),

    /**
     * Curries a _functionOps up to an arity of 4 (won't call _functionOps until 4 or more args).
     * @function module:_functionOps.curry4
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = fn => curryN(4, fn),

    /**
     * Curries a _functionOps up to an arity of 5 (won't call _functionOps until 5 or more args).
     * @function module:_functionOps.curry5
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = fn => curryN(5, fn);
