import {curry} from "../../function/curry";
import {length} from "../../platform/object";

export const

  /**
   * Reduces a slice, from left-to-right, until predicate is reached.
   */
  $reduceUntilRight = <T, T2>(pred, op, agg: T2, arr: T[]): T2 => {
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
  reduceUntilRight = curry($reduceUntilRight)

;
