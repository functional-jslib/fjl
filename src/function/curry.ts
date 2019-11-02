/**
 * @author edlc
 * @memberOf function
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */

import {NaryOf} from '../types';
import {noop} from './noop';

export const

    /**
     * Curries a function up to a given arity.
     * @function module:function.curryN
     * @param executeArity {Number}
     * @param fn {Nary<any>}
     * @param argsToCurry {...*}
     * @returns {Nary<any>}
     * @throws {Error} - When `fn` is not a function.
     */
    curryN = <FnRetType extends unknown>(
        executeArity: number,
        fn: NaryOf<any, FnRetType>,
        ...argsToCurry: any[]
    ): NaryOf<any, FnRetType> | any => {
        // Throw error if `fn` is not function
        if (!fn || !(fn instanceof Function)) {
            throw new Error(`\`curry*\` functions expect first parameter to be of type \`Function\`;  Received ${fn};`);
        }
        // Return curried `fn`
        return (...args: any[]): FnRetType => {
            const catedArgs = argsToCurry.concat(args),
                canBeCalled = (catedArgs.length >= executeArity) || executeArity <= 0;
            return !canBeCalled ?
                curryN(executeArity - catedArgs.length, fn, ...catedArgs) :
                fn(...catedArgs);
        };
    },

    /**
     * Curries a function based on it's defined arity (note: rest args param (`...rest`) are not counted in arity).
     * @function module:function.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = (fn, ...argsToCurry) => curryN((fn || noop).length, fn, ...argsToCurry),

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
