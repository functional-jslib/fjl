import {ArrayTypeConstructor, Ternary} from "../types";

export const

  /**
   * Maps a function over an "array type" container of values.
   */
  map = <T=any, TS extends any[]=any[]>(
    fn: Ternary<T, number, TS>,
    xs: TS
  ): ReturnType<typeof fn>[] => {
    const limit = xs.length,
      out = new (xs.constructor as ArrayTypeConstructor)(limit);
    for (let i = 0; i < limit; i += 1) {
      out[i] = fn(xs[i], i, xs);
    }
    return out as ReturnType<typeof fn>[];
  },

  /**
   * Curried version of `map` method.
   */
  $map = <T=any, TS extends any[]=any[]>
  (fn: Ternary<T, number, TS>) =>
    (xs: TS): ReturnType<typeof fn>[] =>
      map(fn, xs)
;
