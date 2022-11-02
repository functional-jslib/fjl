import {ReduceOp, TernaryPred} from "../../types";

export const

  /**
   * Reduces a slice, from left-to-right, until predicate is reached.
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
