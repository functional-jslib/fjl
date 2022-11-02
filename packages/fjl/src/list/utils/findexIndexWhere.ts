import {
  TernaryPred,
} from "../../types";

export const

  /**
   * Finds index in "number indexable" (string|array|etc.) that matches given predicate or -1.
   */
  findIndexWhere = (pred: TernaryPred, xs): number => {
    const limit = xs.length;
    for (let ind = 0; ind < limit; ind += 1) {
      const predicateFulfilled = pred(xs[ind], ind, xs);
      if (predicateFulfilled) return ind;
    }
    return -1;
  },

  /**
   * Curried version of `findIndexWhere`.
   */
  $findIndexWhere = (pred: TernaryPred) =>
    xs => findIndexWhere(pred, xs)

;
