/**
 * @author edlc
 * @memberOf function
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */

import {Nary} from '../types';
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

export type CurryOf1<T, Ret> = (a?: T, ...b: T[]) => CurryOf1<T, Ret> | Ret;

export type CurryOf2<T, T2, Ret> = (a?: T, b?: T2, ...c: T2[]) => CurryOf2<T, T2, Ret> | CurryOf1<T, Ret> | Ret;

export type CurryOf3<T, T2, T3, Ret> = (a?: T, b?: T2, c?: T3, ...d: T3[]) =>
    CurryOf3<T, T2, T3, Ret> | CurryOf2<T2, T3, Ret> | CurryOf1<T3, Ret> | Ret;

export type CurryOf4<T, T2, T3, T4, Ret> = (a?: T, b?: T2, c?: T3, d?: T4, ...e: T4[]) =>
    CurryOf4<T, T2, T3, T4, Ret> | CurryOf3<T2, T3, T4, Ret> | CurryOf2<T3, T4, Ret> | CurryOf1<T4, Ret> | Ret;

export type CurryOf5<T, T2, T3, T4, T5, Ret> = (a?: T, b?: T2, c?: T3, d?: T4, e?: T5, ...f: T5[]) =>
    CurryOf5<T, T2, T3, T4, T5, Ret> | CurryOf4<T2, T3, T4, T5, Ret> | CurryOf3<T3, T4, T5, Ret> |
    CurryOf2<T4, T5, Ret> | CurryOf1<T5, Ret> | Ret;

export type CurryOf6<T, T2, T3, T4, T5, T6, Ret> = (a?: T, b?: T2, c?: T3, d?: T4, e?: T5, f?: T6, ...g: T5[]) =>
    CurryOf6<T, T2, T3, T4, T5, T6, Ret> | CurryOf5<T, T2, T3, T4, T5, Ret> | CurryOf4<T2, T3, T4, T5, Ret> |
    CurryOf3<T3, T4, T5, Ret> | CurryOf2<T4, T5, Ret> | CurryOf1<T5, Ret> | Ret;

export type CurryOf<T, Ret> = CurryOf1<T, Ret> | CurryOf2<T, T, Ret> | CurryOf3<T, T, T, Ret> |
    CurryOf4<T, T, T, T, Ret> | CurryOf5<T, T, T, T, T, Ret> | CurryOf6<T, T, T, T, T, T, Ret>;

export type CurryOfX<T, Ret> = CurryOf<T, Ret>;

export type CurryPred2<T> = CurryOf2<T, T, boolean>;

export type CurryPred3<T> = CurryOf3<T, T, T, boolean>;

export type CurryPredOf2<A, B> = CurryOf2<A, B, boolean>;

export type CurryPredOf3<A, B, C> = CurryOf3<A, B, C, boolean>;

export type CurryNReturnType<ParamRetT> = CurryOf1<any, ParamRetT> |
  CurryOf2<any, any, ParamRetT> |
  CurryOf3<any, any, any, ParamRetT> |
  CurryOf4<any, any, any, any, ParamRetT> |
  CurryOf5<any, any, any, any, any, ParamRetT>;

export type Curried<Fn extends Nary, Params extends any[] = any[], RetT = any> = ((...args:  Params) => Curried<Fn, Params, RetT>) | RetT;

export const

    /**
     * Curries a function up to a given arity.
     * @function module:function.curryN
     */
    curryN = <Fn extends Nary>(
        executeArity: number,
        fn: Fn,
        ...argsToCurry: any[]
    ):
        CurryNReturnType<any> => {
        if (!fn || !(fn instanceof Function)) {
            throw new Error(`\`curry*\` functions expect first parameter to be of type \`Function\`;  Received ${fn};`);
        }
        const curriedFn = (...args: any[]): CurryNReturnType<ReturnType<typeof fn>> => {
            const catedArgs = argsToCurry.concat(args),
                canBeCalled = (catedArgs.length >= executeArity) || executeArity <= 0;
            return canBeCalled ?
                fn(...catedArgs) :
                curryN(executeArity - catedArgs.length, fn, ...catedArgs)
                ;
        };

        curriedFn.bind(null)
        // Set our function's `length` since it is "disguised" as a non-variadic function (since `curryN` curries up to
        // a given arity).
        return Object.defineProperty(curriedFn, 'length', {
            get() {
                return executeArity;
            }
        });
    },

    /**
     * Curries a function based on it's defined arity (note: rest args param (`...rest`) are not counted in arity).
     * @function module:function.curry
     * @param fn {Nary}
     * @param argsToCurry {...*}
     * @returns {CurryOf1<any, any> | CurryOf2<any, any, any> |
     *  CurryOf3<any, any, any, any> | CurryOf4<any, any, any, any, any> |
     *  CurryOf5<any, any, any, any, any, any}
     */
    curry = <Fn extends Nary>(fn: Fn, ...argsToCurry: any[]): CurryNReturnType<any> =>
      curryN((fn || noop).length, fn, ...argsToCurry),

    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @function module:function.curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = (fn: Nary): CurryOf2<any, any, any> =>
        curryN(2, fn),

    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @function module:function.curry3
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = (fn: Nary): CurryOf3<any, any, any, any> =>
        curryN(3, fn),

    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @function module:function.curry4
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = (fn: Nary): CurryOf4<any, any, any, any, any> =>
        curryN(4, fn),

    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @function module:function.curry5
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = (fn: Nary): CurryOf5<any, any, any, any, any, any> =>
        curryN(5, fn);
