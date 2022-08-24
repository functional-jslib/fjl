import {ArrayTypeConstructor, ConstructableType, MapOp, NumberIndexable, Slice} from "../types";

/**
 * Maps a function onto a ListLike (string or array) or a functor (value containing a map method).
 */
export const

  map = <T, ArrayType extends Array<T>, RetT, ResultArrayType extends Array<RetT>>(
    fn: MapOp<T, number, ArrayType, RetT>,
    xs: ArrayType
  ): ResultArrayType => {
    const limit = xs.length,
      out = new xs.constructor(limit);
    if (!limit) return out;
    for (let i = 0; i < limit; i += 1) {
      out[i] = fn(xs[i], i, xs);
    }
    return out;
  },

  $map = <T, ArrayType extends Array<T>, RetT, ResultArrayType extends Array<RetT>>
  (fn: MapOp<T, number, ArrayType, RetT>) =>
    (xs: ArrayType): ResultArrayType => map(fn, xs)
;
