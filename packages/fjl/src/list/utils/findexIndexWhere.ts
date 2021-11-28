import {curry, CurryOf2} from "../../function/curry";
import {PredForIndexable, Indexable} from "../../types";
import {length} from "../length";

export const

  /**
   * Finds index in slice (string|array) that matches given predicate or -1.
   */
  findIndexWhere = <T>(pred: PredForIndexable<T>, xs: Indexable<T>): number => {
    let ind = 0;
    const limit = length(xs);
    for (; ind < limit; ind += 1) {
      const predicateFulfilled = !!pred(xs[ind] as T, ind, xs);
      if (predicateFulfilled) {
        return ind;
      }
    }
    return -1;
  },

  /**
   * Curried version of `findIndexWhere`.
   */
  $findIndexWhere = curry(findIndexWhere) as CurryOf2<PredForIndexable, Indexable, number>

;
