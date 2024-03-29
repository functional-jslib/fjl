import {TernaryPred} from "../types";

export const

  /**
   * Filters given slice (string, and or array-like) against structure of elements using given predicate (`pred`) - same as `[].filter` but for any type containing intersection of array & string interfaces.
   */
  filter = <T>(pred: TernaryPred<T, number, T[]>, xs: T[]): T[] => {
    const limit = xs.length,
      out = xs.slice(0, 0);

    if (!limit) return out;

    // Filter items against predicate
    for (let i = 0; i < limit; i += 1) {
      const x = xs[i];
      if (pred(x, i, xs)) out.push(x);
    }

    return out;
  },

  /**
   * Curried version of `filter`.
   */
  $filter = (pred: TernaryPred) =>
    xs => filter(pred, xs)

;
