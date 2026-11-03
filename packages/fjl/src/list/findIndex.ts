import {NumberIndexable, TernaryPred} from "../types";

export const

  /**
   * Finds index in "number indexable" (string|array|etc.) that matches given predicate or -1.
   *
   * @todo Should support any indexable/Iterable/IterableIterator types
   */
  findIndex = <T = any>(
    pred: TernaryPred<T, number, NumberIndexable<T>>,
    xs: NumberIndexable<T>
  ): number => {
    const limit = xs.length;
    for (let ind = 0; ind < limit; ind += 1)
      if (pred(xs[ind], ind, xs)) return ind;
    return -1;
  },

  /**
   * Curried version of `findIndex`.
   */
  $findIndex = <T = any>(pred: TernaryPred<T, number, NumberIndexable<T>>) =>
    (xs: NumberIndexable<T>): number =>
      findIndex(pred, xs)

;
