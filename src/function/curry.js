import fnOrError from './fnOrError';

/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @memberOf _function
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */

export const

    /**
     * @private
     * @type {string}
     */
    curryNotFnErrPrefix = '`fn` in `curry(fn, ...args)`',

    /**
     * Curries a function based on it's defined arity (argument's arrayOps expected length).
     * @function module:function.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = (fn, ...argsToCurry) => curryN(fnOrError(curryNotFnErrPrefix, fn).length, fn, ...argsToCurry),

    /**
     * Curries a function up to a given arity.
     * @function module:function.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */
    curryN = (executeArity, fn, ...curriedArgs) => {
        return (...args) => {
            let concatedArgs = curriedArgs.concat(args),
                canBeCalled = (concatedArgs.length >= executeArity) || !executeArity;
            return !canBeCalled ? curryN.apply(null, [executeArity, fnOrError(curryNotFnErrPrefix, fn)].concat(concatedArgs)) :
                fnOrError(curryNotFnErrPrefix, fn).apply(null, concatedArgs);
        };
    },

    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @function module:function.curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = fn => curryN(2, fn),

    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @function module:function.curry3
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = fn => curryN(3, fn),

    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @function module:function.curry4
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = fn => curryN(4, fn),

    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @function module:function.curry5
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = fn => curryN(5, fn);
