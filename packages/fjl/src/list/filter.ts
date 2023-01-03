import {TernaryPred} from "../types";
import {pushN} from "./pushN";
import {append} from "./append";

export const

  /**
   * Filters given slice (string, and or array-like) against structure of elements using given predicate (`pred`) - same as `[].filter` but for any type containing intersection of array & string interfaces.
   */
  filter = <T>(pred: TernaryPred<T, number, typeof xs>, xs): typeof xs => {
    const limit = xs.length,
      appender = Array.isArray(xs) ? pushN : append;

    let out = xs.slice(0, 0);

    // If no items, exit
    if (!limit) return out;

    // Filter items against predicate
    for (let ind = 0; ind < limit; ind++) {
      if (pred(xs[ind], ind, xs)) out = appender(out, xs[ind]);
    }

    return out;
  },

  /**
   * Curried version of `filter`.
   */
  $filter = (pred: TernaryPred) =>
    xs => filter(pred, xs)

;
