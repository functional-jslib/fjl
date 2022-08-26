import {NumberIndexable, PredForNumIndexable} from "../../types";

export const

  /**
   * Finds indices by predicate.
   */
  findIndicesWhere = <T>(pred: PredForNumIndexable<T>, xs: NumberIndexable<T>): number[] | undefined => {
    const limit = xs.length;
    let ind = 0;
    const out: any[] = [];
    for (; ind < limit; ind++) {
      if (pred(xs[ind] as T, ind, xs)) {
        out.push(ind);
      }
    }
    return out.length ? out : undefined;
  },

  /**
   * Curried version of `findIndicesWhere`.
   */
  $findIndicesWhere = <T>(pred: PredForNumIndexable<T>) =>
    (xs: NumberIndexable<T>): number[] | undefined => findIndicesWhere(pred, xs)

;
