import {TernaryPred} from "../types";

export const

  /**
   * Filters given array against structure of elements using given predicate (`pred`) (same as `[].filter`).
   */
  filter = <T>(pred: TernaryPred<T, number, T[]>, xs: T[]): T[] => {
    const limit = xs.length,
      out = [];

    // If no items, exit
    if (!limit) return out;

    // Filter items against predicate
    for (let ind = 0; ind < limit; ind++) {
      if (pred(xs[ind], ind, xs)) out.push(xs[ind]);
    }

    return out;
  },

  /**
   * Curried version of `filter`.
   */
  $filter = <T>(pred: TernaryPred<T, number, T[]>) =>
    (xs: T[]): T[] => filter(pred, xs)

;
