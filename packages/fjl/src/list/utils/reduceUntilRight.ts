import {ReduceOp, PredForNumIndexable, NumberIndexable} from "../../types";

export const

  /**
   * Reduces a slice, from left-to-right, until predicate is reached.
   */
  reduceUntilRight = <T = any, RetT = any>(pred: PredForNumIndexable<T>,
                               op: ReduceOp<T, NumberIndexable<T>, RetT>,
                               agg: RetT,
                               arr: NumberIndexable<T>): RetT => {
    const limit = arr.length;
    if (!limit) {
      return agg;
    }
    let ind = limit - 1,
      result = agg;
    for (; ind >= 0; ind--) {
      if (pred(arr[ind], ind, arr)) {
        break;
      }
      result = op(result, arr[ind], ind, arr);
    }
    return result;
  };

/**
 * Curried version of `$reduceUntilRight`.
 */
export const $reduceUntilRight = <T = any, RetT = any>(pred: PredForNumIndexable<T>) =>
    (op: ReduceOp<T, NumberIndexable<T>, RetT>) =>
      (agg: RetT) =>
        (arr: NumberIndexable<T>): RetT =>
          reduceUntilRight(pred, op, agg, arr)
  ;
