/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @memberOf _function
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */
import {apply, length, concat} from '../_jsPlatform/_jsPlatform';
import {fnOrError} from '../_object/_utils';

const notFnErrPrefix = '`fn` in `curry(fn, ...args)`';

export const

    /**
     * Curries a function based on it's defined arity (argument's arrayOps expected length).
     * @function module:_function.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = (fn, ...argsToCurry) => curryN(fnOrError(notFnErrPrefix, fn).length, fn, ...argsToCurry),

    /**
     * Curries a function up to a given arity.
     * @function module:_function.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */
    curryN = (executeArity, fn, ...curriedArgs) => {
        return (...args) => {
            let concatedArgs = concat(curriedArgs, args),
                canBeCalled = (length(concatedArgs) >= executeArity) || !executeArity;
            return !canBeCalled ? apply(curryN, concat([executeArity, fnOrError(notFnErrPrefix, fn)], concatedArgs)) :
                apply(fnOrError(notFnErrPrefix, fn), concatedArgs);
        };
    },

    /**
     * Curries a _function up to an arity of 2 (won't call _function until 2 or more args).
     * @function module:_function.curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = fn => curryN(2, fn),

    /**
     * Curries a _function up to an arity of 3 (won't call _function until 3 or more args).
     * @function module:_function.curry3
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = fn => curryN(3, fn),

    /**
     * Curries a _function up to an arity of 4 (won't call _function until 4 or more args).
     * @function module:_function.curry4
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = fn => curryN(4, fn),

    /**
     * Curries a _function up to an arity of 5 (won't call _function until 5 or more args).
     * @function module:_function.curry5
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = fn => curryN(5, fn);