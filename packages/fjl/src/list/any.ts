import {curry, CurryOf2} from "../function/curry";
import {length} from "../platform/object";
import {PredForIndexable} from "./types";
import {Indexable} from "../types";
import {keys} from "../platform/object";

export type Any<Pred, Functor> = CurryOf2<Pred, Functor, boolean>;

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
  $any = curry(any) as Any<PredForIndexable, Indexable>;
