/**
 * @author edlc
 * @memberOf function
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */

import {UnitNary} from '../types';
import {noop} from './noop';

export type Curry1<T> = (a?: T, ...b: T[]) => Curry1<T> | T;

export type Curry2<T> = (a?: T, b?: T, ...c: T[]) => Curry2<T> | Curry1<T> | T;

export type Curry3<T> = (a?: T, b?: T, c?: T, ...d: T[]) => Curry3<T> | Curry2<T> | Curry1<T> | T;

export type Curry4<T> = (a?: T, b?: T, c?: T, d?: T, ...e: T[]) => Curry4<T> | Curry3<T> | Curry2<T> | Curry1<T> | T;

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

export type CurriedOf1<Fn extends UnitNary, Params extends any[] = any[], RetT = any> =
  (a?: Params[0], ...bs: any[]) => CurriedOf1<Fn, Params, RetT> | RetT;

export type CurriedOf2<Fn extends UnitNary, Params extends any[] = any[], RetT = any> =
  (a?: Params[0], b?: Params[1], ...cs: any[]) =>
    CurriedOf2<Fn, Params, RetT> |
    CurriedOf1<Fn, Params, RetT> |
    RetT;

export type CurriedOf3<Fn extends UnitNary, Params extends any[] = any[], RetT = any> =
  (a?: Params[0], b?: Params[1], c?: Params[2], ...ds: any[]) =>
    CurriedOf3<Fn, Params, RetT> |
    CurriedOf2<Fn, Params, RetT> |
    CurriedOf1<Fn, Params, RetT> |
    RetT;

export type CurriedOf4<Fn extends UnitNary, Params extends any[] = any[], RetT = any> =
  (a?: Params[0], b?: Params[1], c?: Params[2], d?: Params[3], ...es: any[]) =>
    CurriedOf4<Fn, Params, RetT> |
    CurriedOf3<Fn, Params, RetT> |
    CurriedOf2<Fn, Params, RetT> |
    CurriedOf1<Fn, Params, RetT> |
    RetT;

export type CurriedOf5<Fn extends UnitNary, Params extends any[] = any[], RetT = any> =
  (a?: Params[0], b?: Params[1], c?: Params[2], d?: Params[3], e?: Params[4], ...fs: any[]) =>
    CurriedOf5<Fn, Params, RetT> |
    CurriedOf4<Fn, Params, RetT> |
    CurriedOf3<Fn, Params, RetT> |
    CurriedOf2<Fn, Params, RetT> |
    CurriedOf1<Fn, Params, RetT> |
    RetT;

export type CurriedOf6<Fn extends UnitNary, Params extends any[] = any[], RetT = any> =
  (a?: Params[0], b?: Params[1], c?: Params[2], d?: Params[3], e?: Params[4], f?: Params[5], ...gs: any[]) =>
    CurriedOf6<Fn, Params, RetT> |
    CurriedOf5<Fn, Params, RetT> |
    CurriedOf4<Fn, Params, RetT> |
    CurriedOf3<Fn, Params, RetT> |
    CurriedOf2<Fn, Params, RetT> |
    CurriedOf1<Fn, Params, RetT> |
    RetT;

export type Curried<Fn extends UnitNary, Params extends any[] = any[], RetT = any> = CurriedOf6<Fn, Params, RetT>;

export const

  /**
   * Curries a function up to a given arity.
   */
  curryN = <Fn extends UnitNary, Params extends any[], RetT>(
    executeArity: number,
    fn: Fn,
    ...argsToCurry: [...Params]
  ):
    Curried<Fn, Params, RetT> => {
    if (!fn || !(fn instanceof Function)) {
      throw new Error(`\`curry*\` functions expect first parameter to be of type \`Function\`;  Received ${fn};`);
    }
    const curriedFn = (...args: [...Params]): Curried<Fn, Params, RetT> => {
      const catedArgs = argsToCurry.concat(args),
        canBeCalled = (catedArgs.length >= executeArity) || executeArity <= 0;
      return canBeCalled ?
        fn(...catedArgs) :
        curryN(executeArity - catedArgs.length, fn, ...catedArgs)
        ;
    };

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
   */
  curry = <Fn extends UnitNary, Params extends any[], RetT>(fn: Fn, ...argsToCurry: [...Params]): Curried<Fn, Params, RetT> =>
    curryN((fn || noop).length, fn, ...argsToCurry),

  /**
   * Curries a function up to an arity of 2 (won't call function until 2 or more args).
   */
  curry2 = <F extends UnitNary, Params extends any[], RetT = any>(fn: F): CurryOf2<Params[0], Params[1], RetT> =>
    curryN(2, fn),

  /**
   * Curries a function up to an arity of 3 (won't call function until 3 or more args).
   */
  curry3 = <F extends UnitNary, Params extends any[], RetT = any>(fn: F):
    CurryOf3<Params[0], Params[1], Params[2], RetT> => curryN(3, fn),

  /**
   * Curries a function up to an arity of 4 (won't call function until 4 or more args).
   */
  curry4 = <F extends UnitNary, Params extends any[], RetT = any>(fn: F):
    CurryOf4<Params[0], Params[1], Params[2], Params[3], RetT> => curryN(4, fn),

  /**
   * Curries a function up to an arity of 5 (won't call function until 5 or more args).
   */
  curry5 = <F extends UnitNary, Params extends any[], RetT = any>(fn: F):
    CurryOf5<Params[0], Params[1], Params[2], Params[3], Params[4], RetT> => curryN(5, fn);
