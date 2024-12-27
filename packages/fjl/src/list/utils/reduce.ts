import {NumberIndexable, ReduceOp} from "../../types";

export const

  /**
   * Reduces a number indexable structure by given reduction function - same as [].reduce but also for strings,
   * and user-land number-indexable types.
   */
  reduce = (op: ReduceOp, agg: any, xs: NumberIndexable): ReturnType<typeof op> => {
    const limit = xs.length;
    let result = agg;
    for (let i = 0; i < limit; i += 1)
      result = op(result, xs[i], i, xs);
    return result;
  },

  /**
   * Curried `reduce` combinator.
   */
  $reduce = (op: ReduceOp) =>
    (agg: any) =>
      (xs: NumberIndexable): ReturnType<typeof op> =>
        reduce(op, agg, xs)

;
