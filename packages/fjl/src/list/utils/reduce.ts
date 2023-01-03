import {ReduceOp} from "../../types";

export const

  /**
   * Reduces an iterable by given reduction function - same as [].reduce but also for strings/objects with defined iterators, etc.).
   * **Note:** If iterable is falsy, aggregator gets returned.
   */
  reduce = (op: ReduceOp, agg, xs): ReturnType<typeof op> => {
    if (!xs) return agg;
    let result = agg,
      ind = 0;
    for (const x of xs) {
      result = op(result, x, ind++, xs);
    }
    return result;
  },

  /**
   * Curried `reduce` combinator.
   */
  $reduce = (op: ReduceOp) => agg => (xs): ReturnType<typeof op> =>
    reduce(op, agg, xs)

;
