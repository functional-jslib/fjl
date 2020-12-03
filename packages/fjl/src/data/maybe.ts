/**
 * @module maybe
 */
import {isset} from '../object/is';
import {curry, CurryOf1, id} from '../function';
import {Monad, MonadBase, MonadConstructor, unwrapMonadByType} from './monad';
import {UnaryOf} from "../types";
import {FunctorMapFn} from "./types";
import {instanceOf} from "../platform/object";

let NothingSingleton;

/**
 * Class for creating a `Nothing`.
 * @note Nothing always returns a singleton instance of `Nothing`.
 * @note Nothing shouldn't be used with generic type as the passed in type is ignored internally.
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
    map<RetT>(f: FunctorMapFn<RetT>): Nothing | Just<RetT> {
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
    nothing = <T>(x?: T): Nothing => new Nothing()
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
        return just(x);
    }

    /**
     * Maps incoming function over contained value and
     */
    map<RetT>(fn: FunctorMapFn<RetT>): Just<RetT> | Nothing {
        const constructor = this.constructor as JustConstructor<T>,
            value = this.valueOf();
        return isset(value) && !isNothing(value) ? constructor.of(fn(value)) : nothing();
    }
}

export const

    /**
     * Checks for `Just`.
     */
    isJust = instanceOf(Just) as <T>(x: T) => boolean,

    /**
     * Wraps `x` in an `Just`.
     */
    just = <T>(x?: T): Just<T> => new Just(x),

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
    maybe = curry(<A, B, C>(replacement: B, fn: UnaryOf<A, C>, maybeInst: Maybe<A>) => {
        const subject = isset(maybeInst) && isMaybe(maybeInst) ? (maybeInst as Just<A>).map(id) : nothing();
        return isNothing(subject) ? replacement : (subject as Just<A>).map(fn).join();
    }),

    /**
     * Returns received Maybe or makes one from `x`.
     */
    toMaybe = <T>(x: T): Maybe<any> => isMaybe(x) ? (x as unknown as Maybe<T>).map(id) : just(x).map(id),

    /**
     * Unwraps just (recursively).
     */
    unwrapJust = unwrapMonadByType(Just) as UnaryOf<Monad<any>, any>,

    /**
     * Unwraps maybe (recursively) or returns `Nothing`.
     */
    unwrapMaybe = <T>(x: Maybe<T>): Maybe<T> | T => isNothing(x) ? nothing() : unwrapJust(x),

    /**
     * Equality operator for maybes.
     */
    maybeEqual = curry(<A, B>(a: Maybe<A>, b: Maybe<B>) => unwrapMaybe(a) === unwrapMaybe(b)),

    /**
     * Checks for maybe.
     */
    isMaybe = <T>(x: T): boolean => isNothing(x) || isJust(x),

    /**
     * Always returns a `Maybe` (from `x`).
     */
    alwaysMaybe = <T>(x: T): Maybe<T> => {
        if (!isset(x)) {
            return nothing();
        }
        return isMaybe(x) ? x as unknown as Maybe<T> : just(x);
    }
;
