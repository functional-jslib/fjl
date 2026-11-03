import {ArrayTypeConstructor, Ternary} from "../types";

export const

  /**
   * Maps a function over an "array type" container of values.
   */
  map = <T = any, RetT = any>(
    fn: Ternary<T, number, T[], RetT>,
    xs: T[]
  ): RetT[] => {
    const limit = xs.length,
      out = new (xs.constructor as ArrayTypeConstructor)(limit);
    for (let i = 0; i < limit; i += 1) {
      out[i] = fn(xs[i], i, xs);
    }
    return out as RetT[];
  },

  /**
   * Curried version of `map` method.
   */
  $map = <T = any, RetT = any>(fn: Ternary<T, number, T[], RetT>) =>
    (xs: T[]): RetT[] =>
      map(fn, xs)
;
