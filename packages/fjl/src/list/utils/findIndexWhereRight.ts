import {curry, CurryOf2} from "../../function/curry";
import {length} from "../length";
import {PredForIndexable, Indexable} from "../../types";

export const

  /**
   * Returns found index or -1 if index not found.
   */
  findIndexWhereRight = <T>(pred: PredForIndexable<T>, arr: Indexable<T>): number => {
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
  $findIndexWhereRight = curry(findIndexWhereRight) as CurryOf2<PredForIndexable, Indexable, number>

;
