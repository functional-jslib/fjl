/**
 * Created by edlc on 12/9/16.
 * Contains basic `Monad` class and associated methods.
 * For 'what is a monad'/back-story
 * @see `Maybe` reference: [http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html](http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html)
 * @see `Either` reference: [http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html](http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html)
 * @module monad
 */

import {isset} from "../object/isset";
import {$instanceOf} from '../platform/object';
import {curry, CurryOf1, toFunction, curry2, CurryOf2} from "../function";
import {
  Applicative, ApplicativeConstructor, Functor,
  FunctorConstructor, FunctorMapFn, Apply, ApplyConstructor, TypeRef
} from "../types";
import {isType} from "../object";

export interface Monad<T> extends Applicative<T> {
  join(): T;

  flatMap<RetT>(fn: FunctorMapFn<RetT>): Monad<RetT>;
}

export type MonadConstructor<T> = ApplicativeConstructor<T>;

export class MonadBase<T> implements Monad<T> {

  /**
   * Same as `new Monad(...)` just in 'static' function format.
   */
  static of<X>(x: X): Monad<X> {
    return new MonadBase(x);
  }

  static liftA2<A, B, RetT>(fn, appA: Applicative<A>, appB: Applicative<B>): Applicative<RetT> {
    return (appA.constructor as ApplicativeConstructor<RetT>).of(
      fn(appA.valueOf(), appB.valueOf())
    );
  }

  static apRight<A, B, RetT>(appA: Applicative<A>, appB: Applicative<B>): Applicative<RetT> {
    (appA.valueOf() as unknown as CallableFunction)();
    return (appB.constructor as ApplicativeConstructor<RetT>).of(
      (appB.valueOf() as unknown as CallableFunction)()
    );
  }

  static apLeft<A, B, RetT>(appA: Applicative<A>, appB: Applicative<B>): Applicative<RetT> {
    const out = (appA.valueOf() as unknown as CallableFunction)();
    (appB.valueOf() as unknown as CallableFunction)();
    return (appA.constructor as ApplicativeConstructor<RetT>).of(out);
  }

  constructor(readonly value?: T) {
  }

  valueOf(): T {
    return this.value;
  }

  map<MapOpRet>(fn: FunctorMapFn<MapOpRet>): Functor<MapOpRet> | Functor {
    return new (this.constructor as FunctorConstructor<MapOpRet>)(fn(this.valueOf()));
  }

  /**
   * Applicative apply operation - applies contained function over passed in functor.
   */
  ap<X, RetT>(f: Functor<X>): Apply<RetT> {
    return new (this.constructor as ApplyConstructor<T>)(f.map(
      toFunction(this.valueOf()) as FunctorMapFn<RetT>
      ).valueOf()
    ) as unknown as Apply<RetT>;
  }

  /**
   * Monadic join - Removes one layer of monadic structure from value.
   */
  join(): T {
    return this.valueOf();
  }

  /**
   * Flat map operation.
   */
  flatMap<RetT = any>(fn: FunctorMapFn<RetT>): Monad<RetT> {
    const out = unwrapMonadByType(this.constructor as TypeRef, this.map(fn) as Monad<RetT> | RetT);
    return (this.constructor as ApplicativeConstructor<RetT>).of(out) as Monad<RetT>;
  }

  /**
   * Simple to string implementation to make instances where this monad is dumped out
   * as a string more readable.
   */
  toString(): string {
    return `${this.constructor.name}(${this.valueOf()})`
  }
}

export const

  /**
   * Returns boolean indicating whether given value is an
   * instance of monad or not.
   */
  isMonad = $instanceOf(MonadBase) as CurryOf1<any, boolean>,

  /**
   * Calls `valueOf` on value (use for functional composition).
   */
  valueOf = <T>(x: Monad<T>): T => x.valueOf(),

  /**
   * Calls `valueOf` on given value.  Same as
   * monadic `join` operation (extracts inner value of
   * container/object).
   */
  join = valueOf,

  /**
   * Maps given function over given functor.
   */
  fmap = <T, RetT>(fn: FunctorMapFn<RetT>, x: Functor<T>): Functor<RetT> | Functor => x.map(fn),

  /**
   * Curried version of `fmap`.
   */
  $fmap = curry(fmap),

  /**
   * Applies function contained by applicative to contents of given functor.
   * (Same as functional applicative `apply`).  Returns a functor containing the newly
   * returned value from the application.
   */
  ap = <A, B, RetT>(app: Applicative<A>, functor: Functor<B>): Functor<RetT> => app.ap(functor),

  /**
   * Curried version of `ap`.
   */
  $ap = curry(ap),

  /**
   * Flat maps a function over given monad's contained value.
   */
  flatMap = <T, RetT>(fn: FunctorMapFn<RetT>, monad: Monad<T>): Monad<RetT> => monad.flatMap(fn),

  /**
   * Curried version of `flatMap`.
   */
  $flatMap = curry(flatMap),

  /**
   * Unwraps monad by type.
   */
  unwrapMonadByType = <T>(Type: TypeRef, monad: Monad<T> | T): any => {
    if (!isset(monad) || !isType(Type, monad)) {
      return monad;
    }
    let result = (monad as Monad<T>).join() as Monad<T> | T;
    if (isset(result)) {
      return result;
    }
    while (isset(result) && result !== monad && result instanceof monad.constructor) {
      result = (monad as Monad<T>).join();
    }
    return result;
  },

  /**
   * Curried version of `unwrapMonadByType`.
   */
  $unwrapMonadByType = curry2(unwrapMonadByType) as CurryOf2<TypeRef, Monad<any> | any, any>;
