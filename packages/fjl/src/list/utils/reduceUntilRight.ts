import {curry} from "../../function/curry";
import {length} from "../length";;
import {Indexable} from "../../types";
import {PredForIndexable} from "../types";
import {ReduceOp} from "../../platform";

export const

  /**
   * Reduces a slice, from left-to-right, until predicate is reached.
   */
  reduceUntilRight = <T, RetT>(pred: PredForIndexable<T>,
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
  },

  /**
   * Curried version of `$reduceUntilRight`.
   */
  $reduceUntilRight = curry(reduceUntilRight)

;
