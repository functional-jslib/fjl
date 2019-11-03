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
    curryN = (
        executeArity: number,
        fn: NaryOf<any, unknown>,
        ...argsToCurry: any[]
    ): NaryOf<any, unknown> | any => {
        if (!fn || !(fn instanceof Function)) {
            throw new Error(`\`curry*\` functions expect first parameter to be of type \`Function\`;  Received ${fn};`);
        }
        return argsToCurry.length >= executeArity ?
            fn(...argsToCurry) :
            (...args: any[]): unknown => {
                const catedArgs = argsToCurry.concat(args),
                    canBeCalled = (catedArgs.length >= executeArity) || executeArity <= 0;
                return canBeCalled ?
                    fn(...catedArgs) :
                    curryN(executeArity - catedArgs.length, fn, ...catedArgs)
                    ;
            };
    },

    /**
     * Curries a function based on it's defined arity (note: rest args param (`...rest`) are not counted in arity).
     * @function module:function.curry
     * @param fn {NaryOf<any, any>}
     * @param argsToCurry {...*}
     * @returns {NaryOf<any, any>}
     */
    curry = (fn: NaryOf<any, unknown>, ...argsToCurry): NaryOf<any, unknown> =>
        curryN((fn || noop).length, fn, ...argsToCurry),

    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @function module:function.curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = (fn: NaryOf<any, unknown>): NaryOf<any, unknown> => curryN(2, fn),

    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @function module:function.curry3
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = (fn: NaryOf<any, unknown>): NaryOf<any, unknown> => curryN(3, fn),

    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @function module:function.curry4
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = (fn: NaryOf<any, unknown>): NaryOf<any, unknown> => curryN(4, fn),

    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @function module:function.curry5
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = (fn: NaryOf<any, unknown>): NaryOf<any, unknown> => curryN(5, fn);
