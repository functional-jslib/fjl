/**
 * @module maybe
 */
import {isset} from '../object/is';
import {curry, id, trampoline} from '../function';
import {getMonadUnwrapper, Monad, MonadConstructor} from './monad';
import {MapFunc, UnaryOf} from "../types";
import {FunctorMapFn} from "./functor";
import {instanceOf} from "../platform/object";

let NothingSingleton;

/**
 * Class for creating a `Nothing`.
 * @note Nothing always returns a singleton instance of `Nothing`.
 */
export class Nothing extends Monad<any> {
    /**
     * Applicative `pure` - Same as `new Nothing()`, `Nothing()`, and `nothing()`.
     */
    static of(x?: any): Monad<any> {
        return new Nothing();
    }

    constructor(x?: any) {
        super(x);
        if (NothingSingleton) {
            return NothingSingleton;
        }
        NothingSingleton = this;
        Object.freeze(NothingSingleton);
    }

    /**
     * Returns `Nothing`.
     */
    valueOf(): this {
        return this;
    }

    /**
     * Returns `Nothing`.
     */
    join(): Monad<any> {
        return this;
    }

    /**
     * Returns `Nothing`.
     */
    map(f: MapFunc<any, any, any, any>): this {
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
    flatMap(f: UnaryOf<any, any>): this {
        return this;
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
    nothing = (): Nothing => new Nothing()
;

export interface JustConstructor<T> {
    new(x: T): Just<T>;

    counterConstructor: MonadConstructor<T>;

    of<X>(x: X): Just<X>;

    readonly prototype: Just<T>;
}

export class Just<T> extends Monad<T> {
    static counterConstructor = Nothing;

    /**
     * Applicative pure - Same as `new Just(...)`.
     */
    static of<X>(x?: X): Just<X> {
        return just(x);
    }

    /**
     * Maps incoming function over contained value and
     */
    map<RetT>(fn: FunctorMapFn<T, Just<T>, RetT>): Just<RetT> | Nothing {
        const constructor = this.constructor as JustConstructor<T>,
            counterConstructor = constructor.counterConstructor as MonadConstructor<T>,
            value = this.valueOf();
        return isset(value) && !isNothing(value) ? constructor.of(fn(value)) :
            counterConstructor.of(value) as unknown as Nothing;
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

const [justUnWrapper, justUnWrapperTailCallName] = getMonadUnwrapper(Just);

export const
    /**
     * The maybe function takes a `replacement` value, a function (unary operation), and a Maybe value.
     * If the Maybe value is `Nothing`, the function returns the `replacement` value.
     * Otherwise, it applies the function to the value contained  by the `Just` and returns the result.
     */
    maybe = curry(<A, B, C>(replacement: B, fn: UnaryOf<A, C>, maybeInst: Maybe<A>) => {
        const subject = isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(id) : nothing();
        return isNothing(subject) ? replacement : subject.map(fn).join();
    }),

    /**
     * Unwraps just (recursively).
     */
    unWrapJust = trampoline(justUnWrapper, justUnWrapperTailCallName),

    /**
     * Unwraps maybe (recursively) or returns `Nothing`.
     */
    unWrapMaybe = <T>(x: T): Maybe<T> | T => isNothing(x) ? nothing() : unWrapJust(x),

    /**
     * Equality operator for maybes.
     */
    maybeEqual = curry(<A, B>(a: A, b: B) => unWrapMaybe(a) === unWrapMaybe(b)),

    /**
     * Checks for maybe.
     */
    isMaybe = <T>(x: T): boolean => isNothing(x) || isJust(x),

    /**
     * Returns a `Maybe` (always) from `x`.
     */
    alwaysMaybe = <T>(x: T): Maybe<T> => {
        if (!isset(x)) {
            return nothing();
        }
        return isMaybe(x) ? x as unknown as Maybe<T> : just(x);
    }
;
