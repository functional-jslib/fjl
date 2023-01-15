import {NumberIndexable, TernaryPred} from "../types";

/**
 * Returns true if all items in container return `true` for predicate `p`.
 */
export const all = <T = any>(p: TernaryPred<T, number, NumberIndexable<T>>, xs: NumberIndexable<T>): boolean => {
  const limit = xs.length
  if (!limit) return false;
  for (let i = 0; i < limit; i++) {
    if (!p(xs[i], i, xs)) return false;
  }
  return true;
};

/**
 * Curried version of `all`.
 */
export const $all = (p: TernaryPred) =>
  (xs: NumberIndexable): boolean => all(p, xs)

;
