import {BinaryPred, NaryPred, TernaryPred, UnaryPred} from "../types";

export const

    /**
     * Negates an unary function (a function that takes one argument).
     */
    negateF = <T>(fn: UnaryPred<T>): UnaryPred<T> =>
        (x: T): boolean => !fn(x),

    /**
     * Takes a function that takes two parameters and returns a negated version of given
     * function.
     */
    negateF2 = <A, B>(fn: BinaryPred<A, B>): BinaryPred<A, B> =>
        (a, b): boolean => !fn(a, b),

    /**
     * Takes a function that takes three parameters and returns a
     * negated version of given function.
     */
    negateF3 = <A, B, C>(fn: TernaryPred<A, B, C>): TernaryPred<A, B, C> =>
        (a, b, c): boolean => !fn(a, b, c),

    /**
     * Returns a negated version of given function.
     * Returned function is variadic and un-curried.
     */
    negateFN = <T>(fn: NaryPred<T>): NaryPred<T> =>
        (...args: T[]): boolean => !fn(...args);
