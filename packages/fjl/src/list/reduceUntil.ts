import {NumberIndexable, Quaternary, TernaryPred} from "../types";

export const

  /**
   * Reduces a "number indexable" object (array, object, etc.) until predicate returns `true`.
   */
  reduceUntil = <T = any, A = any>(
    pred: TernaryPred<T, number, NumberIndexable<T>>,
    op: Quaternary<A, T, number, NumberIndexable<T>, A>,
    agg: A,
    xs: NumberIndexable<T>
  ): A => {
    const limit = xs.length;
    let result = agg;
    for (let ind = 0; ind < limit; ind++) {
      if (pred(xs[ind], ind, xs)) break;
      result = op(result, xs[ind], ind, xs);
    }
    return result;
  },

  /**
   * Curried version of `reduceUntil` function.
   */
  $reduceUntil = <T = any>(pred: TernaryPred<T, number, NumberIndexable<T>>) =>
    <A = any>(op: Quaternary<A, T, number, NumberIndexable<T>, A>) =>
      (agg: A) =>
        (xs: NumberIndexable<T>): A => reduceUntil(pred, op, agg, xs)

;
