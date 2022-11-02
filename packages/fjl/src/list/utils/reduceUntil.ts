import {ReduceOp, TernaryPred} from "../../types";

export const

  /**
   * Reduces a "number indexable" until predicate returns `true`.
   */
  reduceUntil = (
    pred: TernaryPred,
    op: ReduceOp,
    agg,
    xs
  ) => {
    const limit = xs.length;
    if (!limit) return agg;
    let ind = 0,
      result = agg;
    for (; ind < limit; ind++) {
      if (pred(xs[ind], ind, xs)) break;
      result = op(result, xs[ind], ind, xs);
    }
    return result;
  },

  /**
   * Curried version of `reduceUntil` function.
   */
  $reduceUntil = (pred: TernaryPred) =>
    (op: ReduceOp) =>
      agg =>
        xs => reduceUntil(pred, op, agg, xs)

;
