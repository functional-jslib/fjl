import {reverse} from '../platform/array';
import {curry, curry2, CurryOf2, CurryOf3, CurryOf4, CurryOf5} from './curry';
import {NaryOf, BinaryOf, TernaryOf, QuaternaryOf, QuinaryOf} from "../types";

export const

    /**
     * Returns a curried function requiring given functions arguments in reverse
     * (returned function expects 2 or more variables (curried at 2 or more args)).
     */
    flipN = <T, RetT>(fn: NaryOf<T, RetT>): CurryOf2<T, T, RetT> =>
        curry2((...args: T[]): RetT => fn(...reverse(args))) as CurryOf2<T, T, RetT>,

    /**
     * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
     */
    flip = <A, B, RetT>(fn: BinaryOf<A, B, RetT>): CurryOf2<A, B, RetT> =>
        curry((b, a) => fn(a, b)) as CurryOf2<any, any, any>,

    /**
     * Same as `flip` except returns a flipped function of arity 3.
     */
    flip3 = <A, B, C, RetT>(fn: TernaryOf<A, B, C, RetT>): CurryOf3<A, B, C, RetT> =>
        curry((c, b, a) => fn(a, b, c)) as CurryOf3<A, B, C, RetT>,

    /**
     * Same as `flip` except returns a flipped function of arity 4.
     */
    flip4 = <A, B, C, D, RetT>(fn: QuaternaryOf<A, B, C, D, RetT>): CurryOf4<A, B, C, D, RetT> =>
        curry((d, c, b, a) => fn(a, b, c, d)) as CurryOf4<A, B, C, D, RetT>,

    /**
     * Same as `flip` except returns a flipped function of arity 5.
     */
    flip5 = <A, B, C, D, E, RetT>(fn: QuinaryOf<A, B, C, D, E, RetT>): CurryOf5<A, B, C, D, E, RetT> =>
        curry((e, d, c, b, a) => fn(a, b, c, d, e)) as CurryOf5<A, B, C, D, E, RetT>;