import {NumberIndexable, TernaryPred} from "../../types";

export const

  /**
   * Returns found index or -1 if index not found.
   */
  findIndexWhereRight = (
    pred: TernaryPred,
    xs: NumberIndexable
  ): number => {
    for (let ind = xs.length - 1; ind >= 0; ind -= 1)
      if (pred(xs[ind], ind, xs)) return ind;
    return -1;
  },

  /**
   * Curried version of `findIndexWhereRight`.
   */
  $findIndexWhereRight = (pred: TernaryPred) =>
    (xs: NumberIndexable): number =>
      findIndexWhereRight(pred, xs)

;
