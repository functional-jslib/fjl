import {length} from "./length";
import {PredForIndexable, Indexable} from "../types";
import {keys} from "../platform/object";

/**
 * Returns true if all items in container return `true` for predicate `p`.
 */
export const all = <T>(p: PredForIndexable<T>, xs: Indexable<T>): boolean => {
  const ks = keys(xs),
    limit = length(ks);
  let ind = 0;
  if (!limit) {
    return false;
  }
  for (; ind < limit; ind++) {
    if (!p(xs[ks[ind]], ind, xs)) {
      return false;
    }
  }
  return true;
};

/**
 * Curried version of `all`.
 */
export const $all = <T>(p: PredForIndexable<T>) =>
  (xs: Indexable<T>): boolean => all(p, xs)

;
