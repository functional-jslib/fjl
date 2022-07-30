import {Indexable, PredForIndexable} from "../../types";
import {length} from "../length";

export const

  /**
   * Finds indices by predicate.
   */
  findIndicesWhere = <T>(pred: PredForIndexable<T>, xs: Indexable<T>): number[] | undefined => {
    const limit = length(xs);
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
  $findIndicesWhere = <T>(pred: PredForIndexable<T>) =>
    (xs: Indexable<T>): number[] | undefined => findIndicesWhere(pred, xs)

;
