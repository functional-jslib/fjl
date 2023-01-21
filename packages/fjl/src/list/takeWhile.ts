import {Slice, TernaryPred} from "../types";

export const

  /**
   * Returns a slice containing elements that match predicate upto non-matching element.
   */
  takeWhile = <T>(pred: TernaryPred, xs: Slice<T>): typeof xs => {
    const limit = xs.length;
    let i = 0;
    for (; i < limit; i += 1) {
      if (!pred(xs[i], i, xs)) break;
    }
    return xs.slice(0, i);
  },

  $takeWhile = <T>(pred: TernaryPred) =>
    (xs: Slice<T>): typeof xs =>
      takeWhile(pred, xs);
