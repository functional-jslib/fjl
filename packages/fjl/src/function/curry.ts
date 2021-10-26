/**
 * @author edlc
 * @memberOf function
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */

import {UnitNary} from '../types';
import {noop} from './noop';
import {typeOf} from "../object";

export type Curry2<T = any> =
  ((a: T, b: T, ...c: T[]) => T) &
  ((a: T) => (b: T, ...c: T[]) => T)
  ;

export type Curry3<T = any> =
  ((a: T) => (b: T) => (c: T, ...d: T[]) => T) &
  ((a: T, b: T, c: T, ...d: T[]) => T) &
  ((a: T, b: T) => (c: T, ...d: T[]) => T) &
  ((a: T) => (b: T, c: T, ...d: T[]) => T)
  ;

export type Curry4<T = any> =
  ((a: T, b: T, c: T, d: T, ...e: T[]) => T) &
  ((a: T, b: T, c: T) => (d: T, ...e: T[]) => T) &
  ((a: T, b: T) => (c: T, d: T, ...e: T[]) => T) &
  ((a: T) => (b: T) => (c: T) => (d: T, ...e: T[]) => T) &
  ((a: T) => (b: T) => (c: T, d: T, ...e: T[]) => T) &
  ((a: T) => (b: T, c: T, d: T, ...e: T[]) => T) &
  ((a: T, b: T) => (c: T) => (d: T, ...e: T[]) => T)
  ;

export type Curry5<T = any> =
  ((a: T, b: T, c: T, d: T, e: T, ...f: T[]) => T) &
  ((a: T, b: T, c: T, d: T) => (e: T, ...f: T[]) => T) &
  ((a: T, b: T, c: T) => (d: T) => (e: T, ...f: T[]) => T) &
  ((a: T, b: T) => (c: T) => (d: T) => (e: T, ...f: T[]) => T) &
  ((a: T) => (b: T) => (c: T) => (d: T) => (e: T, ...f: T[]) => T) &
  ((a: T) => (b: T) => (c: T) => (d: T, e: T, ...f: T[]) => T) &
  ((a: T) => (b: T) => (c: T, d: T, e: T, ...f: T[]) => T) &
  ((a: T) => (b: T, c: T, d: T, e: T, ...f: T[]) => T) &
  ((a: T, b: T) => (c: T, d: T, e: T, ...f: T[]) => T) &
  ((a: T, b: T, c: T) => (d: T, e: T, ...f: T[]) => T)
  ;

export type Curry<T> = Curry5<T> | Curry4<T> | Curry3<T> | Curry2<T>;

export type CurryOf1<T = any, Ret = any> = (a: T, ...b: T[]) => Ret;

export type CurryOf2<T = any, T2 = any, RetT = any> =
  ((a: T, b: T2, ...c: T2[]) => RetT) &
  ((a: T) => (b: T2, ...c: T2[]) => RetT)
  ;

export type CurryOf3<T = any, T2 = any, T3 = any, Ret = any> =
  ((a: T, b: T2, c: T3, ...d: T3[]) => T) &
  ((a: T, b: T2) => (c: T3, ...d: T3[]) => T) &
  ((a: T) => (b: T2) => (c: T3, ...d: T3[]) => T) &
  ((a: T) => (b: T2, c: T3, ...d: T3[]) => T)
  ;

export type CurryOf4<T = any, T2 = any, T3 = any, T4 = any, Ret = any> =
  ((a: T, b: T2, c: T3, d: T4, ...e: T[]) => T) &
  ((a: T, b: T2, c: T3) => (d: T4, ...e: T[]) => T) &
  ((a: T, b: T2) => (c: T3, d: T4, ...e: T[]) => T) &
  ((a: T) => (b: T2) => (c: T3) => (d: T4, ...e: T[]) => T) &
  ((a: T) => (b: T2) => (c: T3, d: T4, ...e: T[]) => T) &
  ((a: T) => (b: T2, c: T3, d: T4, ...e: T[]) => T) &
  ((a: T, b: T2) => (c: T3) => (d: T4, ...e: T[]) => T)
  ;

export type CurryOf5<T = any, T2 = any, T3 = any, T4 = any, T5 = any, Ret = any> =
  ((a: T, b: T2, c: T3, d: T4, e: T5, ...f: T[]) => T) &
  ((a: T, b: T2, c: T3, d: T4) => (e: T5, ...f: T[]) => T) &
  ((a: T, b: T2, c: T3) => (d: T4) => (e: T5, ...f: T[]) => T) &
  ((a: T, b: T2) => (c: T3) => (d: T4) => (e: T5, ...f: T[]) => T) &
  ((a: T) => (b: T2) => (c: T3) => (d: T4) => (e: T5, ...f: T[]) => T) &
  ((a: T) => (b: T2) => (c: T3) => (d: T4, e: T5, ...f: T[]) => T) &
  ((a: T) => (b: T2) => (c: T3, d: T4, e: T5, ...f: T[]) => T) &
  ((a: T) => (b: T2, c: T3, d: T4, e: T5, ...f: T[]) => T) &
  ((a: T, b: T2) => (c: T3, d: T4, e: T5, ...f: T[]) => T) &
  ((a: T, b: T2, c: T3) => (d: T4, e: T5, ...f: T[]) => T);

export type Curried<T = any, T2 = any, T3 = any, T4 = any, T5 = any, Ret = any> =
  CurryOf5<T, T2, T3, T4, T5, Ret> |
  CurryOf4<T, T2, T3, T4, Ret> |
  CurryOf3<T, T2, T3, Ret> |
  CurryOf2<T, T2, Ret>;

export const

  /**
   * Curries a function up to a given arity.
   */
  curryN = <Fn extends UnitNary, Params extends any[], RetT>(
    executeArity: number,
    fn: Fn,
    ...argsToCurry: any[]
  ): Curried => {
    if (!fn || !(fn instanceof Function)) {
      throw new Error(`\`curry*\` functions expect a \`function\` value for their \`fn\` parameter;` +
        `Received value of type: ${typeOf(fn)};`);
    }
    const curriedFn = (...args: any[]): Curried => {
      const catedArgs = argsToCurry.concat(args),
        canBeCalled = catedArgs.length >= executeArity || executeArity <= 0;
      if (!args.length && !canBeCalled) throw new Error(`${fn.name} expected one or more arguments. Received none.`);
      return canBeCalled ? fn(...catedArgs) :
        curryN(executeArity - catedArgs.length, fn, ...catedArgs);
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
  curry = <Fn extends UnitNary, Params extends any[], RetT>(fn: Fn, ...argsToCurry: [...Params]): Curried =>
    curryN((fn || noop).length, fn, ...argsToCurry),

  /**
   * Curries a function up to an arity of 2 (won't call function until 2 or more args).
   */
  curry2 = <F extends UnitNary, Params extends any[], RetT = any>(fn: F):
    CurryOf2<Params[0], Params[1]> => curryN(2, fn) as CurryOf2<Params[0], Params[1]>,

  /**
   * Curries a function up to an arity of 3 (won't call function until 3 or more args).
   */
  curry3 = <F extends UnitNary, Params extends any[], RetT = any>(fn: F):
    CurryOf3<Params[0], Params[1], Params[2], RetT> => curryN(3, fn) as
    CurryOf3<Params[0], Params[1], Params[2], RetT>,

  /**
   * Curries a function up to an arity of 4 (won't call function until 4 or more args).
   */
  curry4 = <F extends UnitNary, Params extends any[], RetT = any>(fn: F):
    CurryOf4<Params[0], Params[1], Params[2], Params[3], RetT> => curryN(4, fn) as CurryOf4,

  /**
   * Curries a function up to an arity of 5 (won't call function until 5 or more args).
   */
  curry5 = <F extends UnitNary, Params extends any[], RetT = any>(fn: F):
    CurryOf5<Params[0], Params[1], Params[2], Params[3], Params[4], RetT> => curryN(5, fn) as CurryOf5;
