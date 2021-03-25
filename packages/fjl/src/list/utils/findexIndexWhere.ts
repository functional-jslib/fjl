import {curry, CurryOf2} from "../../function/curry";
import {Slice, SlicePred} from "../../platform/slice/types";
import {length} from "../length";;

export const

  /**
   * Finds index in slice (string|array) that matches given predicate or -1.
   */
  findIndexWhere = <T>(pred: SlicePred<T>, arr: Slice<T>): number => {
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
  $findIndexWhere = curry(findIndexWhere) as CurryOf2<SlicePred<any>, Slice<any>, number>

;
