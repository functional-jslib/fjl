import {NumberIndexable, TernaryPred} from "../../types";

export const

  /**
   * Finds indices by predicate.
   */
  findIndicesWhere = (
    pred: TernaryPred,
    xs: NumberIndexable
  ): number[] | undefined => {
    const limit = xs.length;
    const out = [];
    for (let ind = 0; ind < limit; ind++) {
      if (pred(xs[ind], ind, xs)) out.push(ind);
    }
    return out.length ? out : undefined;
  },

  /**
   * Curried version of `findIndicesWhere`.
   */
  $findIndicesWhere = (pred: TernaryPred) =>
    (xs: NumberIndexable): number[] | undefined =>
      findIndicesWhere(pred, xs)

;
