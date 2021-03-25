import {curry, CurryOf4} from "../../function/curry";
import {PredForIndexable, PredForSlice} from "../types";
import {ReduceOp} from "../../platform/types";
import {length} from "../length";;
import {Indexable, Lengthable} from "../../types";

export type ReduceUntil<T1, RetT> = CurryOf4<PredForIndexable<T1>,
  ReduceOp<T1, Indexable<T1>, RetT>, // @todo Refactor `ReduceOp`
  RetT, Indexable<T1>, RetT>;

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
  $reduceUntil = curry(reduceUntil) as ReduceUntil<any, any>

;
