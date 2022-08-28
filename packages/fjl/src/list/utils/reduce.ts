import {ReduceOp} from "../../types";

export const

  /**
   * Reduces a "number indexable" by given reduction function (same as [].reduce but also for strings/arbitrary "number indexable" objects/etc.).
   */
  reduce = (op: ReduceOp, agg, xs) => {
    const limit = xs.length;
    if (!limit) return agg;
    let result = agg;
    for (let ind = 0; ind < limit; ind++) {
      result = op(result, xs[ind], ind, xs);
    }
    return result;
  },

  /**
   * Curried `reduce` combinator.
   */
  $reduce = (op: ReduceOp) => agg => xs =>
    reduce(op, agg, xs)

;
