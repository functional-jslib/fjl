import {ReduceOp, PredForIndexable, Indexable, Lengthable} from "../../types";
import {length} from "../length";

export const

  /**
   * Un-curried `reduceUntil` func.
   */
  reduceUntil = <T, RetT>(pred: PredForIndexable<T>,
                          op: ReduceOp<T, Indexable<T>, RetT>,
                          agg: RetT,
                          xs: Indexable<T>): RetT => {
    const limit = length(xs as unknown as Lengthable);
    if (!limit) {
      return agg;
    }
    let ind = 0,
      result = agg;
    for (; ind < limit; ind++) {
      if (pred(xs[ind] as T, ind, xs)) {
        break;
      }
      result = op(result, xs[ind] as T, ind, xs);
    }
    return result;
  },

  /**
   * Reduces a slice until predicate returns `true`.
   */
  $reduceUntil = <T, RetT>(pred: PredForIndexable<T>) =>
    (op: ReduceOp<T, Indexable<T>, RetT>) =>
      (agg: RetT) =>
        (xs: Indexable<T>): RetT => reduceUntil(pred, op, agg, xs)

;
