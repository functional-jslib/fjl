import {NumberIndexable, Quaternary, TernaryPred} from "../../types";

export const

  /**
   * Reduces a "number indexable" object (array, object, etc.) until predicate returns `true`.
   */
  reduceUntilRight = (
    pred: TernaryPred,
    op: Quaternary,
    agg: any,
    xs: NumberIndexable
  ) => {
    const limit = xs.length;
    let result = agg;
    for (let ind = limit - 1; ind >= 0; ind--) {
      if (pred(xs[ind], ind, xs)) break;
      result = op(result, xs[ind], ind, xs);
    }
    return result;
  },

  /**
   * Curried version of `$reduceUntilRight`.
   */
  $reduceUntilRight = (pred: TernaryPred) =>
    (op: Quaternary) =>
      (agg: any) =>
        (xs: NumberIndexable): ReturnType<typeof op> =>
      reduceUntilRight(pred, op, agg, xs)
;
