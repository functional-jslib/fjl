/**
 * Contains `Just` constructor and associated methods.
 */
import Nothing, {isNothing} from './Nothing';
import {Monad, MonadConstructor} from './Monad';
import {isset} from '../object/is';
import {instanceOf} from "../platform/object";
import {FunctorMapFn} from "./Functor";

export interface JustConstructor<T> {
    new(x: T): Just<T>;

    counterConstructor: MonadConstructor<T>;

    of<X>(x: X): Just<X>;

    readonly prototype: Just<T>;
}

export default class Just<T> extends Monad<T> {
    static counterConstructor = Nothing;

    /**
     * Applicative pure - Same as `new Just(...)`.
     */
    static of<X>(x: X): Just<X> {
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
     * @function module:maybe.isJust
     * @param x {*}
     * @returns {boolean}
     */
    isJust = instanceOf(Just) as <T>(x: T) => boolean,

    /**
     * Functional constructor (function that returns an instance) for `Just` -
     * Same as `new Just(...)` (just shorter and can be used as a function).
     * @function module:maybe.just
     * @param x {Just|*}
     * @returns {Just}
     */
    just = <T>(x: T): Just<T> => new Just(x),

    /**
     * Ensures `Just`
     * @function module:maybe.toJust
     * @param x {Just|*}
     * @returns {Just}
     */
    toJust = <T>(x: T): Just<T> | T => isJust(x) ? x : just(x)

;