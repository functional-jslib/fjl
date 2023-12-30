import {BinaryPred, NaryPred, TernaryPred, UnaryPred} from "../types";

export const

    /**
     * Returns negated version of `fn`.
     */
    negateF = <T>(fn: UnaryPred<T>): UnaryPred<T> =>
        (x: T): boolean => !fn(x),

    /**
     * Returns a negated version of `fn` (containing arity of two).
     */
    negateF2 = <A, B>(fn: BinaryPred<A, B>): BinaryPred<A, B> =>
        (a, b): boolean => !fn(a, b),

    /**
     * Returns a negated version of `fn` (containing arity of three).
     */
    negateF3 = <A, B, C>(fn: TernaryPred<A, B, C>): TernaryPred<A, B, C> =>
        (a, b, c): boolean => !fn(a, b, c),

    /**
     * Returns a negated version of `fn` (requiring nary args (none, or more)).
     */
    negateFN = <T>(fn: NaryPred<T>): NaryPred<T> =>
        (...args: T[]): boolean => !fn(...args);
