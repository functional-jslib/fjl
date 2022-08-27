import {TernaryPred} from "../../types";

export const

  /**
   * Returns found index or -1 if index not found.
   */
  findIndexWhereRight = (pred, xs): number => {
    let ind = xs.length - 1;
    for (; ind >= 0; ind -= 1) {
      const predicateFulfilled = !!pred(xs[ind], ind, xs);
      if (predicateFulfilled) return ind;
    }
    return -1;
  },

  /**
   * Curried version of `findIndexWhereRight`.
   */
  $findIndexWhereRight = (pred: TernaryPred) =>
    xs => findIndexWhereRight(pred, xs)

;
