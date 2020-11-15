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
import {curry, trampoline, CurryOf1, toFunction} from "../function";
import {
    Applicative, ApplicativeConstructor, Functor,
    FunctorConstructor, FunctorMapFn, Apply, ApplyConstructor
} from "./types";

export interface Monad<T> extends Applicative<T> {
    join(): T;

    flatMap<RetT>(fn: FunctorMapFn<RetT>): Monad<RetT>;
}

export type MonadConstructor<T> = ApplicativeConstructor<T>;

export class MonadBase<T> implements Monad<T>{

    /**
     * Same as `new Monad(...)` just in 'static' function format.
     */
    static of<X>(x: X): Monad<X> {
        return new MonadBase(x);
    }

    static liftA2<A, B, RetT>(fn, appA: Applicative<A>, appB: Applicative<B>): Applicative<RetT> {
        return (this.constructor as ApplicativeConstructor<RetT>).of(
            fn(appA.valueOf(), appB.valueOf)
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
    ap<X>(f: Functor<X>): Apply<X> {
        return new (this.constructor as ApplyConstructor<X>)(f.map(
            (toFunction(this.valueOf()) as FunctorMapFn<X>)
        ).valueOf());
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
    flatMap<RetT = void>(fn: FunctorMapFn<RetT>): Monad<RetT> {
        const out = unwrapMonadByType(this.constructor, fn(this.join()));
        return (this.constructor as ApplicativeConstructor<RetT>).of(out) as Monad<RetT>;
    }
}

export const

    /**
     * Returns boolean indicating whether given value is an
     * instance of monad or not.
     */
    isMonad = instanceOf(MonadBase) as CurryOf1<any, boolean>,

    /**
     * Always returns a monad;  If given value is not
     * a monad creates one using given value.
     */
    toMonad = <T>(x: T): Monad<T> => !isMonad(x) ? new MonadBase(x) : x as unknown as Monad<T>,

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
        <T, MapperRet>(fn: FunctorMapFn<MapperRet>, x: Functor<T>): Functor<MapperRet> | Functor => x.map(fn)
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
    getMonadUnwrapper = <T extends Function>(Type: T) => {
        return [function unwrapMonadByType(monad) {
            return instanceOf(Type, monad) ?
                function trampolineCall() {
                    return unwrapMonadByType(monad.valueOf());
                } :
                monad;
        }, 'trampolineCall'];
    },

    /**
     * Unwraps monad by type.
     */
    unwrapMonadByType = (Type, monad) => {
        if (!isset(monad)) {
            return monad;
        }
        const [unwrapper, tailCallName] = getMonadUnwrapper(Type),
            unwrap = trampoline(unwrapper, tailCallName);
        return unwrap(monad);
    };
