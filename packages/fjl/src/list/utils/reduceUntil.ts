import {ReduceOp, NumberIndexable, PredForNumIndexable} from "../../types";

export const

  /**
   * Un-curried `reduceUntil` func.
   */
  reduceUntil = <T, RetT>(pred: PredForNumIndexable<T>,
                          op: ReduceOp<T, NumberIndexable<T>, RetT>,
                          agg: RetT,
                          xs: NumberIndexable<T>): RetT => {
    const limit = xs.length;
    if (!limit) {
      return agg;
    }
    let ind = 0,
      result = agg;
    for (; ind < limit; ind++) {
      if (pred(xs[ind], ind, xs)) {
        break;
      }
      result = op(result, xs[ind], ind, xs);
    }
    return result;
  },

  /**
   * Reduces a slice until predicate returns `true`.
   */
  $reduceUntil = <T, RetT>(pred: PredForNumIndexable<T>) =>
    (op: ReduceOp<T, NumberIndexable<T>, RetT>) =>
      (agg: RetT) =>
        (xs: NumberIndexable<T>): RetT => reduceUntil(pred, op, agg, xs)

;
