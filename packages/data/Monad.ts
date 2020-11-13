/**
 * Created by edlc on 12/9/16.
 * Contains basic `Monad` class and associated methods.
 * For 'what is a monad'/back-story
 * @see `Maybe` reference: [http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html](http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Maybe.html)
 * @see `Either` reference: [http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html](http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-Either.html)
 * @module monad
 */

import {isset} from "../object/isset";
import {instanceOf} from '../platform/object';
import {Applicative, ApplicativeConstructor} from './Applicative';
import {curry, trampoline, CurryOf1} from "../function";

import {UnaryOf} from "../types";

export interface MonadConstructor<T> extends ApplicativeConstructor<T> {
    new(x: T): Monad<T>;

    readonly prototype: Monad<T>;
}

/**
 * @class module:monad.Monad
 * @param x {*}
 * @property value {*}
 * @extends module:data.Applicative
 */
export class Monad<T> extends Applicative<T> {
    /**
     * Same as `new Monad(...)` just in 'static' function
     * format.
     * @memberOf module:monad.Monad
     * @static
     * @param x {*}
     * @returns {Monad}
     */
    static of<X>(x: X): Monad<X> {
        return new Monad(x);
    }

    /**
     * Monadic join - Removes one layer of monadic structure from value.
     * @memberOf module:monad.Monad
     * @returns {*}
     */
    join(): T {
        return this.valueOf();
    }

    /**
     * Flat map operation.
     * @memberOf module:monad.Monad
     * @param fn {Function}
     * @returns {Monad}
     */
    flatMap<RetT>(fn: UnaryOf<T, RetT>): Monad<RetT> {
        const out = unWrapMonadByType(this.constructor, fn(this.join()));
        return (this.constructor as MonadConstructor<RetT>).of(out) as Monad<RetT>;
    }

}

export const

    /**
     * Returns boolean indicating whether given value is an
     * instance of monad or not.
     * @function module:monad.isMonad
     * @param value {*}
     * @returns {boolean}
     */
    isMonad = instanceOf(Monad) as CurryOf1<any, boolean>,

    /**
     * Always returns a monad;  If given value is not
     * a monad creates one using given value.
     * @function module:monad.toMonad
     * @param x {Monad|*} - Monad or any.
     * @returns {*}
     */
    toMonad = x => !isMonad(x) ? new Monad(x) : x,

    /**
     * Calls `valueOf` on value (use for functional composition).
     * @function module:monad.valueOf
     * @param x {*}
     * @returns {*}
     */
    valueOf = x => x.valueOf(),

    /**
     * Calls `valueOf` on given value.  Same as
     * monadic `join` operation (extracts inner value of
     * container/object).
     * @function module:monad.join
     * @param x {*}
     * @returns {*}
     */
    join = valueOf,

    /**
     * Maps given function over given functor.
     * @function module:monad.fmap
     * @param fn {Function}
     * @param x {Functor}
     * @returns {Functor}
     */
    fmap = curry((fn, x) => x.map(fn)),

    /**
     * Applies function contained by applicative to contents of given functor.
     * (Same as functional applicative `apply`).
     * @function module:monad.ap
     * @param applicative {Applicative}
     * @param functor {Functor}
     * @returns {Applicative}
     */
    ap = curry((applicative, functor) => applicative.ap(functor)),

    /**
     * Flat maps a function over given monad's contained value.
     * @function module:monad.flatMap
     * @param fn {Function}
     * @param monad {Monad}
     * @returns {Monad}
     */
    flatMap = curry((fn, monad) => monad.flatMap(fn)),

    /**
     * A recursive monad un-wrapper - Returns monad's unwrapped, inner-mostly, contained value (recursively).
     * @function module:monad.getMonadUnWrapper
     * @param Type {Function}
     * @returns {Array.<*>} - [unWrapFunction, tailCallFuncName (used by `trampoline` @see module:fjl.trampoline)]
     */
    getMonadUnWrapper = Type => {
        return [function unWrapMonadByType(monad) {
            return instanceOf(Type, monad) ?
                function trampolineCall() {
                    return unWrapMonadByType(monad.valueOf());
                } :
                monad;
        }, 'trampolineCall'];
    },

    /**
     * Unwraps monad by type.
     * @function module:monad.unWrapMonadByType
     * @param Type {Function}
     * @param monad {Monad}
     * @returns {*}
     */
    unWrapMonadByType = (Type, monad) => {
        if (!isset(monad)) {
            return monad;
        }
        const [unWrapper, tailCallName] = getMonadUnWrapper(Type),
            unwrap = trampoline(unWrapper, tailCallName);
        return unwrap(monad);
    };
