import {NumberIndexable, TernaryPred} from "../types";

export const

  /**
   * Searches from the end of the list, and returns the index of the first match, or -1.
   */
  findLastIndex = <T = any>(
    pred: TernaryPred<T, number, NumberIndexable<T>>,
    xs: NumberIndexable<T>
  ): number => {
    for (let ind = xs.length - 1; ind >= 0; ind -= 1)
      if (pred(xs[ind], ind, xs)) return ind;
    return -1;
  },

  /**
   * Curried version of `findLastIndex`.
   */
  $findLastIndex = <T = any>(pred: TernaryPred<T, number, NumberIndexable<T>>) =>
    (xs: NumberIndexable<T>): number =>
      findLastIndex(pred, xs)

;
