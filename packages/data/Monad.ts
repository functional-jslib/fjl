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
import {Functor, FunctorMapFn} from "./Functor";
import {MapOp} from "../platform/array";

export interface MonadConstructor<T> extends ApplicativeConstructor<T> {
    new(x: T): Monad<T>;

    readonly prototype: Monad<T>;
}

export class Monad<T> extends Applicative<T> {
    /**
     * Same as `new Monad(...)` just in 'static' function
     * format.
     */
    static of<X>(x: X): Monad<X> {
        return new Monad(x);
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
    flatMap<RetT>(fn: UnaryOf<T, RetT>): Monad<RetT> {
        const out = unWrapMonadByType(this.constructor, fn(this.join()));
        return (this.constructor as MonadConstructor<RetT>).of(out) as Monad<RetT>;
    }

}

export const

    /**
     * Returns boolean indicating whether given value is an
     * instance of monad or not.
     */
    isMonad = instanceOf(Monad) as CurryOf1<any, boolean>,

    /**
     * Always returns a monad;  If given value is not
     * a monad creates one using given value.
     */
    toMonad = <T>(x: T): Monad<T> => !isMonad(x) ? new Monad(x) : x as unknown as Monad<T>,

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
    fmap = curry(
        <T, MapperRet>(fn: FunctorMapFn<T, Functor<T>, MapperRet>, x: Functor<T>): Functor<MapperRet> => x.map(fn)
    ),

    /**
     * Applies function contained by applicative to contents of given functor.
     * (Same as functional applicative `apply`).
     */
    ap = curry((applicative, functor) => applicative.ap(functor)),

    /**
     * Flat maps a function over given monad's contained value.
     */
    flatMap = curry((fn, monad) => monad.flatMap(fn)),

    /**
     * A recursive monad un-wrapper - Returns monad's unwrapped, inner-mostly, contained value (recursively).
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
     */
    unWrapMonadByType = (Type, monad) => {
        if (!isset(monad)) {
            return monad;
        }
        const [unWrapper, tailCallName] = getMonadUnWrapper(Type),
            unwrap = trampoline(unWrapper, tailCallName);
        return unwrap(monad);
    };
