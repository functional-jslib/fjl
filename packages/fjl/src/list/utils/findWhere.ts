import {NumberIndexable, PredForNumIndexable} from "../../types";

export const

  /**
   * Finds an item by predicate or returns `undefined`.
   */
  findWhere = <T>(pred: PredForNumIndexable<T>, xs: NumberIndexable<T>): T | undefined => {
    let ind = 0;
    const limit = xs.length;
    if (!limit) {
      return;
    }
    for (; ind < limit; ind++) {
      const elm = xs[ind];
      if (pred(elm as T, ind, xs)) {
        return elm as T;
      }
    }
    return undefined;
  },

  /**
   * Curried version of `findWhere`.
   */
  $findWhere = <T>(pred: PredForNumIndexable<T>) =>
    (xs: NumberIndexable<T>): T | undefined => findWhere(pred, xs)

;
