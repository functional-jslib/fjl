/**
 * @module maybe
 */
import {isset, type Ternary} from 'fjl';
import {Apply, Monad, Functor} from "../types";

type Nothing = Monad

const NothingProto = {
    valueOf(): any {
      return undefined;
    },

    join(): any {
      return undefined;
    },

    map(f: Ternary) {
      return this;
    },

    ap(f: Functor): Apply {
      return this;
    },

    flatMap(f: Ternary) {
      return this;
    },
  },

  VALUE_SYM = Symbol('value');

type MaybeTernaryOp<A = any, RetT = any> = (a: A, i?: keyof Maybe<A>, as?: Maybe<A>) => RetT;

export const

  /**
   * `Nothing` functor;  Will always equal/return `Nothing`, for `new Nothing()`,
   * `Nothing()`, and all of it's `Monad` interface methods`.
   */
  Nothing = (() => {
    function Nothing() {
      return Nothing;
    }

    Nothing.prototype = NothingProto;
    Nothing.prototype.constructor = Nothing;
    Nothing.of = Nothing;

    const out = Object.assign(Nothing, NothingProto);

    /*out[Symbol.hasInstance] = (x) => {
      return x === Nothing;
    };*/

    out[Symbol.species] = () => {
      return Nothing;
    };

    Object.freeze(out);

    return out;
  })(),

  /**
   * Checks for `Nothing`.
   */
  isNothing = (x: any): boolean => x === Nothing,

  /**
   * Returns `Nothing`.
   */
  nothing = Nothing;

type Just<T = any> = Monad<T> & {
  map(fn: Ternary<T>): Maybe<T>
}

export function Just<T>(value?: T): Maybe<T> {
  if (!isset(value)) return Nothing;

  // out[Symbol.species] = () => Just;
  // out[Symbol.hasInstance] = isJust

  return Object.create(Just.prototype, {
    [VALUE_SYM]: {value},
  });
}

Just.prototype.valueOf = function () {
  return this[VALUE_SYM];
};

Just.prototype.map = function (fn) {
  return Just(fn(this.valueOf()));
}

Just.prototype.ap = function (fnctr) {
  const value = this.valueOf(),
    fn = (value ?? false) instanceof Function ? value : () => value;
  return Just(fnctr.map(fn).join());
}

Just.prototype.join = function () {
  return this.valueOf();
}

Just.prototype.flatMap = function (fn) {
  let out = this.map(fn);
  while (isJust(out)) {
    out = out.join();
  }
  return Just(out);
}

Just.prototype.toString = function () {
  return `${Just.name}(${this.valueOf()})`
};

Just.of = Just;

/**
 * Checks for `Just`.
 */
export const isJust = x => isset(x) && x instanceof Just;

export type  Maybe<T = any> = Just<T> | Nothing;

export const

  /**
   * The maybe function takes a `replacement` value, a function (unary operation), and a Maybe value.
   * If the Maybe value is `Nothing`, the function returns the `replacement` value.
   * Otherwise, it applies the function to the value contained  by the `Just` and returns the result.
   */
  maybe = <A, B>(replacement: B, fn: MaybeTernaryOp<A>, maybeInst: Maybe<A> | A): A | B => {
    if (!isset(maybeInst) || isNothing(maybeInst)) return replacement;
    return maybeInst.constructor === Just ? (maybeInst as Just<A>).map(fn).join() : fn(maybeInst as A);
  },

  /**
   * Curried version of `maybe`.
   */
  $maybe = <A, B>(replacement: B) =>
    (fn: MaybeTernaryOp<A>) =>
      (maybeInst: Maybe<A> | A): A | B =>
        maybe(replacement, fn, maybeInst),

  /**
   * Equality operator for maybes.
   */
  maybeEqual = <A, B>(a: Maybe<A>, b: Maybe<B>): boolean => a.join() === b.join(),

  /**
   * Curried version of `maybeEqual`.
   */
  $maybeEqual = <A, B>(a: Maybe<A>) =>
    (b: Maybe<B>): boolean => maybeEqual(a, b),

  /**
   * Checks for maybe.
   */
  isMaybe = <T>(x: T): boolean => isNothing(x) || isJust(x)
;
