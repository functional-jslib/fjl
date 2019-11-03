/**
 * @author edlc
 * @memberOf function
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */

import {NaryOf} from '../types';
import {noop} from './noop';

export type Curry1<T> = (a?: T, ...b: T[]) => Curry1<T> | T;

export type Curry2<T> = (a?: T, b?: T, ...c: T[]) => Curry2<T> | Curry1<T> | T;

export type Curry3<T> = (a?: T, b?: T, c?: T, ...d: T[]) =>
    Curry3<T> | Curry2<T> | Curry1<T> | T;

export type Curry4<T> = (a?: T, b?: T, c?: T, d?: T, ...e: T[]) =>
    Curry4<T> | Curry3<T> | Curry2<T> | Curry1<T> | T;

export type Curry5<T> = (a?: T, b?: T, c?: T, d?: T, e?: T, ...f: T[]) =>
    Curry5<T> | Curry4<T> | Curry3<T> | Curry2<T> | Curry1<T> | T;

export type Curry6<T> = (a?: T, b?: T, c?: T, d?: T, e?: T, f?: T, ...g: T[]) =>
    Curry6<T> | Curry5<T> | Curry4<T> | Curry3<T> | Curry2<T> | Curry1<T> | T;

export type Curry<T> = Curry1<T> | Curry2<T> | Curry3<T> | Curry4<T> | Curry5<T> | Curry6<T>;

export type CurryX<T> = Curry<T>;

export type Curry1Of<T, Ret> = (a?: T, ...b: T[]) => Curry1Of<T, Ret> | Ret;

export type Curry2Of<T, T2, Ret> = (a?: T, b?: T2, ...c: T2[]) =>
    Curry2Of<T, T2, Ret> | Curry1Of<T, Ret> | Ret;

export type Curry3Of<T, T2, T3, Ret> = (a?: T, b?: T2, c?: T3, ...d: T3[]) =>
    Curry3Of<T, T2, T3, Ret> | Curry2Of<T2, T3, Ret> | Curry1Of<T3, Ret> | Ret;

export type Curry4Of<T, T2, T3, T4, Ret> = (a?: T, b?: T2, c?: T3, d?: T4, ...e: T4[]) =>
    Curry4Of<T, T2, T3, T4, Ret> | Curry3Of<T2, T3, T4, Ret> | Curry2Of<T3, T4, Ret> | Curry1Of<T4, Ret> | Ret;

export type Curry5Of<T, T2, T3, T4, T5, Ret> = (a?: T, b?: T2, c?: T3, d?: T4, e?: T5, ...f: T5[]) =>
    Curry5Of<T, T2, T3, T4, T5, Ret> | Curry4Of<T2, T3, T4, T5, Ret> | Curry3Of<T3, T4, T5, Ret> |
    Curry2Of<T4, T5, Ret> | Curry1Of<T5, Ret> | Ret;

export type Curry6Of<T, T2, T3, T4, T5, T6, Ret> = (a?: T, b?: T2, c?: T3, d?: T4, e?: T5, f?: T6, ...g: T5[]) =>
    Curry6Of<T, T2, T3, T4, T5, T6, Ret> | Curry5Of<T, T2, T3, T4, T5, Ret> | Curry4Of<T2, T3, T4, T5, Ret> |
    Curry3Of<T3, T4, T5, Ret> | Curry2Of<T4, T5, Ret> | Curry1Of<T5, Ret> | Ret;

export type CurryOf<T, Ret> = Curry1Of<T, Ret> | Curry2Of<T, T, Ret> | Curry3Of<T, T, T, Ret> |
    Curry4Of<T, T, T, T, Ret> | Curry5Of<T, T, T, T, T, Ret> | Curry6Of<T, T, T, T, T, T, Ret>;

export type CurryXOf<T, Ret> = CurryOf<T, Ret>;

export const

    /**
     * Curries a function up to a given arity.
     * @function module:function.curryN
     * @param executeArity {Number}
     * @param fn {NaryOf<any, any>} - Any function that may take one or more `any`s and return `any`.
     * @param argsToCurry {...*}
     * @returns {CurryXOf<any, any>} - One of the `CurryXOf<T, Ret>` types.
     * @throws {Error} - When `fn` is not a function.
     */
    curryN = (
        executeArity: number,
        fn: NaryOf<any, unknown>,
        ...argsToCurry: any[]
    ):
        Curry1Of<any, unknown> |
        Curry2Of<any, any, unknown> |
        Curry3Of<any, any, any, unknown> |
        Curry4Of<any, any, any, any, unknown> |
        Curry5Of<any, any, any, any, any, unknown> => {
        if (!fn || !(fn instanceof Function)) {
            throw new Error(`\`curry*\` functions expect first parameter to be of type \`Function\`;  Received ${fn};`);
        }
        const out = (...args: any[]): unknown => {
            const catedArgs = argsToCurry.concat(args),
                canBeCalled = (catedArgs.length >= executeArity) || executeArity <= 0;
            return canBeCalled ?
                fn(...catedArgs) :
                curryN(executeArity - catedArgs.length, fn, ...catedArgs)
                ;
        };
        // Set our function's `length` since it is "disguised" as a non-variadic function (since `curryN` currys up to
        // a given arity).
        return Object.defineProperty(out, 'length', {
            get() {
                return executeArity;
            }
        });
    },

    /**
     * Curries a function based on it's defined arity (note: rest args param (`...rest`) are not counted in arity).
     * @function module:function.curry
     * @param fn {NaryOf<any, any>}
     * @param argsToCurry {...*}
     * @returns {Curry1Of<any, any> | Curry2Of<any, any, any> |
     *  Curry3Of<any, any, any, any> | Curry4Of<any, any, any, any, any> |
     *  Curry5Of<any, any, any, any, any, any}
     */
    curry = (fn: NaryOf<any, unknown>, ...argsToCurry):
        Curry1Of<any, unknown> |
        Curry2Of<any, any, unknown> |
        Curry3Of<any, any, any, unknown> |
        Curry4Of<any, any, any, any, unknown> |
        Curry5Of<any, any, any, any, any, unknown> => curryN((fn || noop).length, fn, ...argsToCurry),

    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @function module:function.curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = (fn: NaryOf<any, unknown>): Curry2Of<any, any, unknown> =>
        curryN(2, fn),

    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @function module:function.curry3
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = (fn: NaryOf<any, unknown>): Curry3Of<any, any, any, unknown> =>
        curryN(3, fn),

    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @function module:function.curry4
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = (fn: NaryOf<any, unknown>): Curry4Of<any, any, any, any, unknown> =>
        curryN(4, fn),

    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @function module:function.curry5
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = (fn: NaryOf<any, unknown>): Curry5Of<any, any, any, any, any, unknown> =>
        curryN(5, fn);
