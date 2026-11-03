import {NumberIndexable, TernaryPred} from "../types";

export const

  /**
   * Finds indices by predicate.
   */
  findIndices = <T = any>(
    pred: TernaryPred<T, number, NumberIndexable<T>>,
    xs: NumberIndexable<T>
  ): number[] | undefined => {
    const limit = xs.length;
    const out = [];
    for (let ind = 0; ind < limit; ind++)
      if (pred(xs[ind], ind, xs)) out.push(ind);
    return out.length ? out : undefined;
  },

  /**
   * Curried version of `findIndices`.
   */
  $findIndices = <T = any>(pred: TernaryPred<T, number, NumberIndexable<T>>) =>
    (xs: NumberIndexable<T>): number[] | undefined =>
      findIndices(pred, xs)

;
