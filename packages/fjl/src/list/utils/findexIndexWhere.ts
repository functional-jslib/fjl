import {curry, CurryOf2} from "../../function/curry";
import {Slice, PredForSlice} from "../../types";
import {length} from "../length";;

export const

  /**
   * Finds index in slice (string|array) that matches given predicate or -1.
   */
  findIndexWhere = <T>(pred: PredForSlice<T>, arr: Slice<T>): number => {
    let ind = 0;
    const limit = length(arr);
    for (; ind < limit; ind += 1) {
      const predicateFulfilled = !!pred(arr[ind] as T, ind, arr);
      if (predicateFulfilled) {
        return ind;
      }
    }
    return -1;
  },

  /**
   * Curried version of `findIndexWhere`.
   */
  $findIndexWhere = curry(findIndexWhere) as CurryOf2<PredForSlice<any>, Slice<any>, number>

;
