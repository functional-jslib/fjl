import {curry, CurryOf2} from "../../function/curry";
import {length} from "../length";;
import {Slice, SlicePred} from "../../types/native";

export const

  /**
   * Returns found index or -1 if index not found.
   */
  findIndexWhereRight = <T>(pred: SlicePred<T>, arr: Slice<T>): number => {
    let ind = length(arr) - 1;
    for (; ind >= 0; ind -= 1) {
      const predicateFulfilled = !!pred(arr[ind] as T, ind, arr);
      if (predicateFulfilled) {
        return ind;
      }
    }
    return -1;
  },

  /**
   * Curried version of `findIndexWhereRight`.
   */
  $findIndexWhereRight = curry(findIndexWhereRight) as CurryOf2<SlicePred<any>, Slice<any>, number>

;
