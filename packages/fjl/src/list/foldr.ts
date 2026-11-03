import {NumberIndexable, Quaternary} from "../types";

export const

  /**
   * Right associative fold.  Reduces a "number indexable" (string|array|etc.) down by the given
   * operation (same as [].reduceRight but also for strings and arbitrary "number indexable" objects).
   */
  foldr = (op: Quaternary, agg: any, xs: NumberIndexable): ReturnType<typeof op> => {
    const limit = xs.length;
    let result = agg;
    for (let ind = limit - 1; ind >= 0; ind--)
      result = op(result, xs[ind], ind, xs);
    return result;
  },

  /**
   * Curried version of `foldr`.
   */
  $foldr = (op: Quaternary) =>
    (agg: any) =>
      (xs: NumberIndexable): ReturnType<typeof op> =>
        foldr(op, agg, xs),

  /**
   * Alias of `foldr`.
   */
  reduceRight = foldr,

  /**
   * Alias of `$foldr`.
   */
  $reduceRight = $foldr

;
