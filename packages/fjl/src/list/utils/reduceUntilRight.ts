import {ReduceOp, PredForArray} from "../../types";

export const

  /**
   * Reduces a slice, from left-to-right, until predicate is reached.
   */
  reduceUntilRight = <T, RetT>(
    pred: PredForArray<T>,
    op: ReduceOp<T, T[], RetT>,
    agg: RetT,
    arr: T[]
  ): RetT => {
    const limit = arr.length;
    if (!limit) return agg;
    let ind = limit - 1,
      result = agg;
    for (; ind >= 0; ind--) {
      if (pred(arr[ind], ind, arr)) break;
      result = op(result, arr[ind], ind, arr);
    }
    return result;
  },

  /**
   * Curried version of `$reduceUntilRight`.
   */
  $reduceUntilRight = <T, RetT>(pred: PredForArray<T>) =>
    (op: ReduceOp<T, T[], RetT>) =>
      (agg: RetT) =>
        (arr: T[]): RetT =>
          reduceUntilRight(pred, op, agg, arr)
;
