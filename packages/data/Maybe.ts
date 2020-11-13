/**
 * @module maybe
 */
import Just, {isJust, just} from './Just';
import Nothing, {isNothing, nothing} from './Nothing';
import {isset} from '../object/is';
import {curry, id, trampoline} from '../function';
import {getMonadUnWrapper} from './Monad';
import {UnaryOf} from "../types";

export {Just, isJust, isNothing, Nothing, just, nothing};

export type  Maybe<T> = Just<T> | Nothing;

const [justUnWrapper, justUnWrapperTailCallName] = getMonadUnWrapper(Just);

export const
    /**
     * The maybe function takes a `replacement` value, a function (unary operation), and a Maybe value.
     * If the Maybe value is `Nothing`, the function returns the `replacement` value.
     * Otherwise, it applies the function to the value contained  by the `Just` and returns the result.
     * @function module:maybe.maybe
     * @param replacement {*}
     * @param fn {Function} - Unary operation.
     * @param maybeInst {(Nothing|Just|*)} - Maybe instance or non-maybe value.
     * @returns {*}
     */
    maybe = curry(<A, B, C>(replacement: B, fn: UnaryOf<A, C>, maybeInst: Maybe<A>) => {
        const subject = isset(maybeInst) && isMaybe(maybeInst) ? maybeInst.map(id) : nothing();
        return isNothing(subject) ? replacement : subject.map(fn).join();
    }),

    /**
     * Unwraps just (recursively).
     * @function module:maybe.unWrapJust
     * @param x {*} - Expected `Just`.
     * @returns {*}
     */
    unWrapJust = trampoline(justUnWrapper, justUnWrapperTailCallName),

    /**
     * Unwraps maybe (recursively) or returns `Nothing`.
     * @function module:maybe.unWrapMaybe
     * @param x {Maybe|any}
     * @returns {Maybe|any}
     */
    unWrapMaybe = <T>(x: T): Maybe<T> | T => isNothing(x) ? nothing() : unWrapJust(x),

    /**
     * Equality operator for maybes.
     * @function module:maybe.maybeEqual
     * @param a {*} - Maybe 1.
     * @param b {*} - Maybe 2.
     * @returns {boolean}
     */
    maybeEqual = curry(<A, B>(a: A, b: B) => unWrapMaybe(a) === unWrapMaybe(b)),

    /**
     * Checks for maybe.
     * @function module:maybe.isMaybe
     *  @param x {*}.
     * @returns {boolean}
     */
    isMaybe = <T>(x: T): boolean => isNothing(x) || isJust(x),

    /**
     * Creates maybe from value.
     * @function module:maybe.toMaybe
     * @param x {*}
     * @returns {Just | Nothing}.
     */
    toMaybe = <T>(x: T): Maybe<T> | T => {
        if (!isset(x)) {
            return nothing();
        }
        return isMaybe(x) ? x : just(x);
    }
;
