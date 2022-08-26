import {PredForArray} from "../../types";

export const

  /**
   * Finds an item by predicate or returns `undefined`.
   */
  findWhere = <T>(pred: PredForArray<T>, xs: T[]): T | undefined => {
    let ind = 0;
    const limit = xs.length;
    if (!limit) return;
    for (; ind < limit; ind++) {
      const elm = xs[ind];
      if (pred(elm, ind, xs)) return elm;
    }
    return undefined;
  },

  /**
   * Curried version of `findWhere`.
   */
  $findWhere = <T>(pred: PredForArray<T>) =>
    (xs: T[]): T | undefined => findWhere(pred, xs)

;
