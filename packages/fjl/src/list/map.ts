import {ArrayType, ArrayTypeConstructor, MapOp} from "../types";

export const

  /**
   * Maps a function onto a ListLike (string or array) or a functor (value containing a map method).
   */
  map = <T, TS extends any[], RetT, RetTS extends RetT[]>(
    fn: MapOp<T, number, TS, RetT>,
    xs: TS
  ): RetTS => {
    const limit = xs.length,
      out = new (xs.constructor as ArrayTypeConstructor)(limit) as RetTS;
    if (!limit) return out;
    for (let i = 0; i < limit; i += 1) {
      out[i] = fn(xs[i] as T, i, xs) as RetT;
    }
    return out;
  },

  $map = <T, TS extends T[], RetT, RetTS extends RetT[]>
  (fn: MapOp<T, number, TS, RetT>) =>
    (xs: TS): RetTS => map(fn, xs)
;
