import {NaryOf, BinaryOf, TernaryOf, QuaternaryOf, QuinaryOf} from "../types";

export const

  /**
   * Returns a curried function requiring given functions arguments in reverse
   * (returned function expects 2 or more variables (curried at 2 or more args)).
   */
  flipN = <T, RetT>(fn: NaryOf<T, RetT>): NaryOf<T, RetT> =>
    (...args: T[]): RetT => fn(...args.reverse()),

  /**
   * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
   */
  flip = <A, B, RetT>(fn: BinaryOf<A, B, RetT>): BinaryOf<B, A, RetT> =>
    (b, a) => fn(a, b),

  /**
   * Flips a function with arity of 3.
   */
  flip3 = <A, B, C, RetT>(fn: TernaryOf<A, B, C, RetT>): TernaryOf<C, B, A, RetT> =>
    (c, b, a) => fn(a, b, c),

  /**
   * Flips a function with arity 4.
   */
  flip4 = <A, B, C, D, RetT>(fn: QuaternaryOf<A, B, C, D, RetT>): QuaternaryOf<D, C, B, A, RetT> =>
    (d, c, b, a) => fn(a, b, c, d),

  /**
   * Same as `flip` except returns a flipped function of arity 5.
   */
  flip5 = <A, B, C, D, E, RetT>(fn: QuinaryOf<A, B, C, D, E, RetT>): QuinaryOf<E, D, C, B, A, RetT> =>
    (e, d, c, b, a) => fn(a, b, c, d, e);
