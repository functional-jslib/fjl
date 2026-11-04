import {NumberIndexable, Quaternary} from "../types";

export const

  /**
   * Right associative fold.  Reduces a "number indexable" (string|array|etc.) down by the given
   * operation (same as [].reduceRight but also for strings and arbitrary "number indexable" objects).
   *
   * @note `op` is called as `op(acc, x, i, xs)`, like `[].reduceRight` (Haskell's is `f x acc`).
   */
  foldr = <T = any, A = any>(op: Quaternary<A, T, number, NumberIndexable<T>, A>, agg: A, xs: NumberIndexable<T>): A => {
    const limit = xs.length;
    let result = agg;
    for (let ind = limit - 1; ind >= 0; ind--)
      result = op(result, xs[ind], ind, xs);
    return result;
  },

  /**
   * Curried version of `foldr`.
   */
  $foldr = <T = any, A = any>(op: Quaternary<A, T, number, NumberIndexable<T>, A>) =>
    (agg: A) =>
      (xs: NumberIndexable<T>): A =>
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
