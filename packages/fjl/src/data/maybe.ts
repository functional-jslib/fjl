/**
 * @module maybe
 */
import {isset} from '../object/is';
import {curry} from '../function';
import {Monad, MonadBase, MonadConstructor} from './monad';
import {Unary} from "../types";
import {FunctorMapFn} from "../types";
import {$instanceOf} from "../platform/object";

let NothingSingleton;

/**
 * Class for creating a `Nothing`.
 * @note Nothing always returns a singleton instance of `Nothing`.
 * @note Nothing shouldn't be used with an generic type as the passed in type is ignored internally.
 */
export class Nothing<T = any> implements Monad<T> {
  /**
   * Applicative `pure` - Same as `new Nothing()`, `Nothing()`, and `nothing()`.
   */
  static of<X>(x?: X): Nothing {
    return new Nothing(x);
  }

  constructor(x?: any) {
    if (NothingSingleton) {
      return NothingSingleton;
    }
    NothingSingleton = this;
    Object.freeze(NothingSingleton);
  }

  /**
   * Returns `Nothing`.
   */
  valueOf(): any {
    return this;
  }

  /**
   * Returns `Nothing`.
   */
  join(): any {
    return this;
  }

  /**
   * Returns `Nothing`.
   */
  map<RetT>(f: FunctorMapFn<RetT>): Nothing {
    return this;
  }

  /**
   * Returns `Nothing`.
   */
  ap(x: any): this {
    return this;
  }

  /**
   * Returns `Nothing`.
   */
  flatMap<RetT>(f: FunctorMapFn<RetT>): Nothing<RetT> {
    return this as unknown as Nothing<RetT>;
  }
}

export const

  /**
   * Checks for `Nothing`.
   */
  isNothing = <T>(x: T): boolean => x === NothingSingleton,

  /**
   * Returns `Nothing`.
   */
  nothing = Nothing.of
;

export interface JustConstructor<T> extends MonadConstructor<T> {
  new(x: T): Just<T>;

  of<X>(x: X): Just<X>;

  readonly prototype: Just<T>;
}

export class Just<T> extends MonadBase<T> {
  /**
   * Applicative pure - Same as `new Just(...)`.
   */
  static of<X>(x?: X): Just<X> {
    return new Just(x);
  }

  /**
   * Maps incoming function over contained value and
   */
  map<RetT>(fn: FunctorMapFn<RetT>): Just<RetT> {
    return super.map(fn) as Just<RetT>;
  }
}

export const

  /**
   * Checks for `Just`.
   */
  isJust = $instanceOf(Just) as <T>(x: T) => boolean,

  /**
   * Wraps `x` in an `Just`.
   */
  just = Just.of,

  /**
   * Ensures an `Just`.
   */
  alwaysJust = <T>(x: T): Just<T> | T => isJust(x) ? x : just(x)
;

export type  Maybe<T> = Just<T> | Nothing;

export const

  /**
   * The maybe function takes a `replacement` value, a function (unary operation), and a Maybe value.
   * If the Maybe value is `Nothing`, the function returns the `replacement` value.
   * Otherwise, it applies the function to the value contained  by the `Just` and returns the result.
   */
  maybe = <A, B>(replacement: B, fn: Unary<A, B>, maybeInst: Maybe<A> | A | null | undefined): B => {
    if (!isset(maybeInst) || isNothing(maybeInst)) return replacement;
    return isMaybe(maybeInst) ? (maybeInst as Just<A>).map(fn).join() : fn(maybeInst as A);
  },

  /**
   * Curried version of `maybe`.
   */
  $maybe = curry(maybe),

  /**
   * Equality operator for maybes.
   */
  maybeEqual = <A, B>(a: Maybe<A>, b: Maybe<B>): boolean => a.join() === b.join(),

  /**
   * Curried version of `maybeEqual`.
   */
  $maybeEqual = curry(maybeEqual),

  /**
   * Checks for maybe.
   */
  isMaybe = <T>(x: T): boolean => isNothing(x) || isJust(x),

  /**
   * Always returns a `Maybe` (from `x`).
   */
  toMaybe = <T>(x: T): Maybe<T> => {
    if (!isset(x)) {
      return nothing();
    }
    return isMaybe(x) ? x as unknown as Maybe<T> : just(x);
  }
;
