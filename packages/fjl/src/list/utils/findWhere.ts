import {NumberIndexable, TernaryPred} from "../../types";

export const

  /**
   * Finds an item by predicate or returns `undefined`.
   */
  findWhere = (
    pred: TernaryPred,
    xs: NumberIndexable
  ): undefined | any => {
    const limit = xs.length;
    if (!limit) return;
    for (let ind = 0; ind < limit; ind++) {
      const elm = xs[ind];
      if (pred(elm, ind, xs)) return elm;
    }
    return undefined;
  },

  /**
   * Curried version of `findWhere`.
   */
  $findWhere = (pred: TernaryPred) =>
    (xs: NumberIndexable): undefined | any =>
      findWhere(pred, xs)

;
