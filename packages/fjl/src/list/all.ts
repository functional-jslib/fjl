import {TernaryPred} from "../types";

/**
 * Returns true if all items in container return `true` for predicate `p`.
 */
export const all = <T>(p: TernaryPred, xs: T[]): boolean => {
  const limit = xs.length
  let ind = 0;
  if (!limit) return false;
  for (; ind < limit; ind++) {
    if (!p(xs[ind], ind, xs)) return false;
  }
  return true;
};

/**
 * Curried version of `all`.
 */
export const $all = <T>(p: TernaryPred) =>
  (xs: T[]): boolean => all(p, xs)

;
