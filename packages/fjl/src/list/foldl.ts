import {NumberIndexable, Quaternary} from "../types";

export const

  /**
   * Left associative fold.  Reduces a "number indexable" (string|array|etc.) down by the given
   * operation (same as [].reduce but also for strings and arbitrary "number indexable" objects).
   */
  foldl = (op: Quaternary, agg: any, xs: NumberIndexable): ReturnType<typeof op> => {
    const limit = xs.length;
    let result = agg;
    for (let i = 0; i < limit; i += 1)
      result = op(result, xs[i], i, xs);
    return result;
  },

  /**
   * Curried version of `foldl`.
   */
  $foldl = (op: Quaternary) =>
    (agg: any) =>
      (xs: NumberIndexable): ReturnType<typeof op> =>
        foldl(op, agg, xs),

  /**
   * Alias of `foldl`.
   */
  reduce = foldl,

  /**
   * Alias of `$foldl`.
   */
  $reduce = $foldl

;
