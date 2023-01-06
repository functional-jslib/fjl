import {Constructable, MapOp} from "../types";

export const

  /**
   * Maps a function onto a ListLike (string or array) or a functor (value containing a map method).
   */
  map = <T = any>(
    fn: MapOp,
    xs: T[]
  ): ReturnType<typeof fn>[] => {
    const limit = xs.length,
      out = new (xs.constructor as Constructable)(limit);
    if (!limit) return out;
    for (let i = 0; i < limit; i += 1) {
      out[i] = fn(xs[i], i, xs);
    }
    return out;
  },

  $map = <T = any>
  (fn: MapOp) =>
    (xs: T[]): ReturnType<typeof fn>[] =>
      map(fn, xs)
;
