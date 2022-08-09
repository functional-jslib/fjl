import {length} from "./length";
import {PredForIndexable, Indexable} from "../types";
import {keys} from "../platform/object";

export const

  /**
   * Returns true if any item in container passes predicate `p`.
   */
  any = <T>(p: PredForIndexable<T>, xs: Indexable<T>): boolean => {
    let ind = 0;
    const ks = keys(xs),
      limit = length(ks);
    if (!limit) {
      return false;
    }
    for (; ind < limit; ind += 1) {
      if (p(xs[ks[ind]], ind, xs)) {
        return true;
      }
    }
    return false;
  },

  /**
   * Curried version of `any`.
   */
  $any = <T>(p: PredForIndexable<T>) =>
    (xs: Indexable<T>): boolean => any(p, xs)

;
