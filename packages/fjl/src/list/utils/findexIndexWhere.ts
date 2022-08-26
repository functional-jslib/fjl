import {
  ArrayType,
  PredForArrayType
} from "../../types";

export const

  /**
   * Finds index in slice (string|array) that matches given predicate or -1.
   */
  findIndexWhere = <T=any, TS extends ArrayType<T>=any>(pred: PredForArrayType<T, TS>, xs: TS): number => {
    let ind = 0;
    const limit = xs.length;
    for (; ind < limit; ind += 1) {
      const predicateFulfilled = pred(xs[ind] as T, ind, xs);
      if (predicateFulfilled) return ind;
    }
    return -1;
  },

  /**
   * Curried version of `findIndexWhere`.
   */
  $findIndexWhere = <T=any, TS extends ArrayType<T>=any>(pred: PredForArrayType<T, TS>) =>
    (xs: TS): number => findIndexWhere(pred, xs)

;
