import {typeOf} from '../object/typeOf';
import {fnOrError} from './fnOrError';

/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @memberOf function
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */

/**
 * @private
 * @type {string}
 */
const

    slice = (x, start, end) => [].slice.call(x, start, end),

    curryNotFnErrPrefix = '`fn` in `curry(fn, ...args)`',

    performCurry = (fn, curryFn, executeArity, args, argsToCurry) => {
        let concatedArgs = argsToCurry.concat(args),
            canBeCalled = (concatedArgs.length >= executeArity) || !executeArity;
        return !canBeCalled ?
            curryFn(executeArity, fn, ...concatedArgs) :
            fn(...concatedArgs);
    }
;

export const

    /**
     * Curries a function up to a given arity.
     * @function module:function.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curryN = (executeArity, fn, ...argsToCurry) => {
        if (!fn || !(fn instanceof Function)) {
            throw new Error(`${curryNotFnErrPrefix} should be a function. ` +
                `Type received: ${typeOf(fn)};  Value received: ${fn}.`);
        }
        switch (executeArity) {
            case 1:
                return function func(x) {
                    return performCurry(fn, curryN, executeArity, slice(arguments), argsToCurry);
                };
            case 2:
                return function func(a, b) {
                    return performCurry(fn, curryN, executeArity, slice(arguments), argsToCurry);
                };
            case 3:
                return function func(a, b, c) {
                    return performCurry(fn, curryN, executeArity, slice(arguments), argsToCurry);
                };
            case 4:
                return function func(a, b, c, d) {
                    return performCurry(fn, curryN, executeArity, slice(arguments), argsToCurry);
                };
            case 5:
                return function func(a, b, c, d, e) {
                    return performCurry(fn, curryN, executeArity, slice(arguments), argsToCurry);
                };
            default:
                return (...args) => performCurry(fn, curryN, executeArity, args, argsToCurry);
        }

    },

    /**
     * Curries a function based on it's defined arity (note: rest args param (`...rest`) are not counted in arity).
     * @function module:function.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = (fn, ...argsToCurry) => curryN(fnOrError(curryNotFnErrPrefix, fn).length, fn, ...argsToCurry),

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
