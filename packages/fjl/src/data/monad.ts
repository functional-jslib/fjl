/**
 * Created by edlc on 12/9/16.
 * Contains basic `Monad` class and associated methods.
 * For 'what is a monad'/back-story
 * @see `Maybe` reference: [http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html](http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html)
 * @see `Either` reference: [http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html](http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html)
 * @module monad
 */
import {isset} from "../object/isset";
import {toFunction} from "../function";
import {
  Applicative, ApplicativeConstructor, Functor,
  FunctorMapOp, TypeRef, Binary, Ternary, MonadConstructor, Monad
} from "../types";
import {isType} from "../object";

export interface BoxedConstructor<T = any> extends MonadConstructor<T> {
  new(x: T);
}

export class Boxed<T = any> implements Monad<T> {

  /**
   * Same as `new Monad(...)` just in 'static' function format.
   */
  static of<X>(x?: X): Boxed<X> {
    return new Boxed(x);
  }

  static liftA2<A, B, RetT>(fn: Binary<A, B, RetT>, appA: Applicative<A>, appB: Applicative<B>): ThisType<RetT> {
    return (appA.constructor as ApplicativeConstructor<RetT>).of(
      fn(toFunction(appA.valueOf())(), toFunction(appB.valueOf())())
    );
  }

  static apRight<A, B, RetT>(appA: Applicative<A>, appB: Applicative<B>): ThisType<RetT> {
    (toFunction(appA.valueOf()) as unknown as CallableFunction)();
    return (appB.constructor as ApplicativeConstructor<RetT>).of(
      (toFunction(appB.valueOf()) as unknown as CallableFunction)()
    );
  }

  static apLeft<A, B, RetT>(appA: Applicative<A>, appB: Applicative<B>): ThisType<RetT> {
    const out = (toFunction(appA.valueOf()) as unknown as CallableFunction)();
    (toFunction(appB.valueOf()) as unknown as CallableFunction)();
    return (appA.constructor as ApplicativeConstructor<RetT>).of(out);
  }

  constructor(readonly value?: T) {
  }

  valueOf(): T {
    return this.value;
  }

  map<RetT = any>(fn: Ternary<T, keyof this, this, RetT>): ThisType<RetT> {
    return Object.getPrototypeOf(this).constructor.of(fn(this.valueOf()));
  }

  /**
   * Applicative apply operation - applies contained function over passed in functor.
   */
  ap<X, RetT>(fnctr: Functor<X>): ThisType<RetT> {
    return Object.getPrototypeOf(this).constructor.of(
      fnctr.map(this.valueOf() as Ternary).valueOf()
    );
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
  flatMap<RetT>(fn: Ternary<T, keyof this, this, RetT>): ThisType<RetT> {
    const out = unwrapMonadByType(this.constructor as TypeRef, this.map(fn) as ThisType<RetT> | RetT);
    return (this.constructor as ApplicativeConstructor<RetT>).of(out) as ThisType<RetT>;
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
  fmap = <T, RetT>(fn: Ternary<T, keyof Functor<T>, Functor<T>, RetT>, x: Functor<T>): InstanceType<typeof x> => x.map(fn),

  /**
   * Curried version of `fmap`.
   */
  $fmap = <T, RetT>(fn: FunctorMapOp<T, RetT>) =>
    (x: Functor<T>): ThisType<RetT> =>
      fmap(fn, x),

  /**
   * Applies function contained by applicative to contents of given functor.
   * (Same as functional applicative `apply`).  Returns a functor containing the newly
   * returned value from the application.
   */
  ap = <A, B, RetT>(app: Applicative<A>, functor: Functor<B>): Applicative<RetT> => app.ap(functor),

  /**
   * Curried version of `ap`.
   */
  $ap = <A, B, RetT>(app: Applicative<A>) =>
    (functor: Functor<B>): Applicative<RetT> => app.ap(functor),

  /**
   * Flat maps a function over given monad's contained value.
   */
  flatMap = <T, RetT>(fn: FunctorMapOp<T, RetT>, monad: Monad<T>): Monad<RetT> => monad.flatMap(fn),

  /**
   * Curried version of `flatMap`.
   */
  $flatMap = <T, RetT>(fn: FunctorMapOp<T, RetT>) =>
    (monad: Monad<T>): Monad<RetT> => monad.flatMap(fn),

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
  $unwrapMonadByType = <T>(Type: TypeRef) =>
    (monad: Monad<T> | T): any =>
      unwrapMonadByType(Type, monad);
