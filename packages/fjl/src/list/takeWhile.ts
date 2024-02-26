import {TernaryPred} from "../types";

export const

  /**
   * Returns items upto point where predicate doesn't hold.
   */
  takeWhile = <T>(pred: TernaryPred, xs: Iterable<T>): T[] => {
    let i = 0;
    const out = [];
    for (const x of xs) {
      if (!pred(x, i, xs)) break;
      out.push(x);
      i += 1;
    }
    return out;
  },

  $takeWhile = <T>(pred: TernaryPred) =>
    (xs: Iterable<T>): T[] => takeWhile(pred, xs)

;
