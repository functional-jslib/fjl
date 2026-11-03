import {NumberIndexable, TernaryPred} from "../types";

export const

  /**
   * Finds indices by predicate.
   */
  findIndices = <T = any>(
    pred: TernaryPred<T, number, NumberIndexable<T>>,
    xs: NumberIndexable<T>
  ): number[] => {
    const limit = xs.length;
    const out: number[] = [];
    for (let ind = 0; ind < limit; ind++)
      if (pred(xs[ind], ind, xs)) out.push(ind);
    return out;
  },

  /**
   * Curried version of `findIndices`.
   */
  $findIndices = <T = any>(pred: TernaryPred<T, number, NumberIndexable<T>>) =>
    (xs: NumberIndexable<T>): number[] =>
      findIndices(pred, xs)

;
