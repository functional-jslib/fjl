import {
  PredForArray,
} from "../../types";

export const

  /**
   * Finds index in slice (string|array) that matches given predicate or -1.
   */
  findIndexWhere = <T>(pred: PredForArray<T>, xs: T[]): number => {
    const limit = xs.length;
    for (let ind = 0; ind < limit; ind += 1) {
      const predicateFulfilled = pred(xs[ind] as T, ind, xs);
      if (predicateFulfilled) return ind;
    }
    return -1;
  },

  /**
   * Curried version of `findIndexWhere`.
   */
  $findIndexWhere = <T>(pred: PredForArray<T>) =>
    (xs: T[]): number => findIndexWhere(pred, xs)

;
