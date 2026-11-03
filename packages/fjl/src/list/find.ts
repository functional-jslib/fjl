import {NumberIndexable, TernaryPred} from "../types";

export const

  /**
   * Finds an item by predicate or returns `undefined`.
   */
  find = <T = any>(
    pred: TernaryPred<T, number, NumberIndexable<T>>,
    xs: NumberIndexable<T>
  ): T | undefined => {
    const limit = xs.length;
    if (!limit) return;
    for (let ind = 0; ind < limit; ind++) {
      const elm = xs[ind];
      if (pred(elm, ind, xs)) return elm;
    }
    return undefined;
  },

  /**
   * Curried version of `find`.
   */
  $find = <T = any>(pred: TernaryPred<T, number, NumberIndexable<T>>) =>
    (xs: NumberIndexable<T>): T | undefined =>
      find(pred, xs)

;
