import {NumberIndexable, TernaryPred} from "../types";

export const

  /**
   * Returns true if any item in container passes predicate `p`.
   */
  any = <T>(p: TernaryPred<T, number, NumberIndexable<T>>,
            xs: NumberIndexable<T>): boolean => {
    const limit = xs.length;
    if (!limit) return false;
    for (let i = 0; i < limit; i += 1) {
      if (p(xs[i], i, xs)) return true;
    }
    return false;
  },

  /**
   * Curried version of `any`.
   */
  $any = <T>(p: TernaryPred<T, number, NumberIndexable<T>>) =>
    (xs: NumberIndexable<T>): boolean => any(p, xs)

;
