import {PredForArray} from "../types";

export const

  /**
   * Returns true if any item in container passes predicate `p`.
   */
  any = <T>(p: PredForArray<T>, xs: T[]): boolean => {
    let ind = 0;
    const limit = xs.length;
    if (!limit) return false;
    for (; ind < limit; ind += 1) {
      if (p(xs[ind], ind, xs)) return true;
    }
    return false;
  },

  /**
   * Curried version of `any`.
   */
  $any = <T>(p: PredForArray<T>) =>
    (xs: T[]): boolean => any(p, xs)

;
