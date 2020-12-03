import {curry, CurryOf4} from "../../function/curry";
import {PredForSliceOf} from "../types";
import {ReduceOp} from "../../platform/array/types";
import {SliceOf} from "../../platform/slice/types";
import {length} from "../../platform/object";

export type ReduceUntil<T1, T2> = CurryOf4<PredForSliceOf<T1>,
  ReduceOp<T1, SliceOf<T1>, T2>, // @todo Refactor `ReduceOp`
  T2, SliceOf<T1>, T2>;

export const

  /**
   * Un-curried `reduceUntil` func.
   */
  $reduceUntil = <T, T2>(pred: PredForSliceOf<T>, op: ReduceOp<T, SliceOf<T>, T2>, agg: T2, xs: SliceOf<T>): T2 => {
    const limit = length(xs);
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
  reduceUntil = curry($reduceUntil) as ReduceUntil<any, any>

;
