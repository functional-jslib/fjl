import {NumberIndexable, ReduceOp} from "../../types";

export const

  /**
   * Reduces an iterable by given reduction function - same as [].reduce but also for strings/objects with defined iterators, etc.).
   * **Note:** If iterable is falsy, aggregator gets returned.
   */
  reduce = (op: ReduceOp, agg: any, xs: NumberIndexable): ReturnType<typeof op> => {
    const limit = xs.length;
    if (!limit) return agg;
    let result = agg;
    for (let i = 0; i < limit; i += 1) {
      result = op(result, xs[i], i, xs);
    }
    return result;
  },

  /**
   * Curried `reduce` combinator.
   */
  $reduce = (op: ReduceOp) =>
    (agg: any) =>
      (xs: any[]): ReturnType<typeof op> =>
        reduce(op, agg, xs)

;
