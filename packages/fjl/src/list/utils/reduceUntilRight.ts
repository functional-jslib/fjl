import {curry, CurryOf4} from "../../function/curry";
import {length} from "../length";
import {Indexable, ReduceOp, PredForIndexable} from "../../types";

export const

  /**
   * Reduces a slice, from left-to-right, until predicate is reached.
   */
  reduceUntilRight = <T = any, RetT = any>(pred: PredForIndexable<T>,
                               op: ReduceOp<T, Indexable<T>, RetT>,
                               agg: RetT,
                               arr: Indexable<T>): RetT => {
    const limit = length(arr);
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

export type ReduceUntilRight = typeof reduceUntilRight;

/**
 * Curried version of `$reduceUntilRight`.
 */
export const $reduceUntilRight = curry(reduceUntilRight) as CurryOf4;
