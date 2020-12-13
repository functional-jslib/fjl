import {curry, CurryOf4} from "../../function/curry";
import {PredForSlice} from "../types";
import {ReduceOp} from "../../platform/array/types";
import {Slice} from "../../platform/slice/types";
import {length} from "../../platform/object";

export type ReduceUntil<T1, T2> = CurryOf4<PredForSlice<T1>,
  ReduceOp<T1, Slice<T1>, T2>, // @todo Refactor `ReduceOp`
  T2, Slice<T1>, T2>;

export const

  /**
   * Un-curried `reduceUntil` func.
   */
  $reduceUntil = <T, T2>(pred: PredForSlice<T>, op: ReduceOp<T, Slice<T>, T2>, agg: T2, xs: Slice<T>): T2 => {
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
