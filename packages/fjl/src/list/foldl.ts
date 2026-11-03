import {NumberIndexable, Quaternary} from "../types";

export const

  /**
   * Left associative fold.  Reduces a "number indexable" (string|array|etc.) down by the given
   * operation (same as [].reduce but also for strings and arbitrary "number indexable" objects).
   */
  foldl = <T = any, A = any>(op: Quaternary<A, T, number, NumberIndexable<T>, A>, agg: A, xs: NumberIndexable<T>): A => {
    const limit = xs.length;
    let result = agg;
    for (let i = 0; i < limit; i += 1)
      result = op(result, xs[i], i, xs);
    return result;
  },

  /**
   * Curried version of `foldl`.
   */
  $foldl = <T = any, A = any>(op: Quaternary<A, T, number, NumberIndexable<T>, A>) =>
    (agg: A) =>
      (xs: NumberIndexable<T>): A =>
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
