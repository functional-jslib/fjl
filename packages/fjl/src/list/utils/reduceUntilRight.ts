import {ReduceOp, TernaryPred} from "../../types";

export const

  /**
   * Reduces a "number indexable" object (array, object, etc.) until predicate returns `true`.
   */
  reduceUntilRight = (
    pred: TernaryPred,
    op: ReduceOp,
    agg,
    xs
  ) => {
    const limit = xs.length;
    if (!limit) return agg;
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
    (op: ReduceOp) => agg => xs =>
      reduceUntilRight(pred, op, agg, xs)
;
