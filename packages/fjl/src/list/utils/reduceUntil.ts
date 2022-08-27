import {ReduceOp, PredForSlice, Slice} from "../../types";

export const

  /**
   * Un-curried `reduceUntil` func.
   */
  reduceUntil = <T, TS extends Slice<T>, RetT>(
    pred: PredForSlice<T>,
    op: ReduceOp<T, TS, RetT>,
    agg: RetT,
    xs: TS
  ): RetT => {
    const limit = xs.length;
    if (!limit) return agg;
    let ind = 0,
      result = agg;
    for (; ind < limit; ind++) {
      if (pred(xs[ind] as T, ind, xs)) break;
      result = op(result, xs[ind] as T, ind, xs);
    }
    return result;
  },

  /**
   * Reduces a slice until predicate returns `true`.
   */
  $reduceUntil = <T, TS extends Slice<T>, RetT>(pred: PredForSlice<T>) =>
    (op: ReduceOp<T, TS, RetT>) =>
      (agg: RetT) =>
        (xs: TS): RetT => reduceUntil(pred, op, agg, xs)

;
