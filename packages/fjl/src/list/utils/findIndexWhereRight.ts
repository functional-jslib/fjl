import {PredForArray} from "../../types";

export const

  /**
   * Returns found index or -1 if index not found.
   */
  findIndexWhereRight = <T>(pred: PredForArray<T>, arr: T[]): number => {
    let ind = arr.length - 1;
    for (; ind >= 0; ind -= 1) {
      const predicateFulfilled = !!pred(arr[ind] as T, ind, arr);
      if (predicateFulfilled) return ind;
    }
    return -1;
  },

  /**
   * Curried version of `findIndexWhereRight`.
   */
  $findIndexWhereRight = <T>(pred: PredForArray<T>) =>
    (arr: T[]): number => findIndexWhereRight(pred, arr)

;
