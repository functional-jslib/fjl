import {curry} from "../function/curry";
import {length} from "./length";
import {Slice} from "../types";

export type ScanrOp<A, B> = (a: A, b: B, i?: number, xs?: Slice<A>) => B;

export const

  /**
   * Same as `scanl` but from the right (similar to `foldr`'s relationship to 'foldl').
   * Note also `scanr`'s relationship ot `foldr`:
   * `head (scanr(fn, z, xs)) === foldr(fn, z, xs).
   */
  scanr = <A, B>(fn: ScanrOp<A, B>, zero: B, xs: Slice<A>): B[] => {
    if (!xs || !length(xs)) {
      return [];
    }
    const limit = length(xs);
    let ind = limit - 1,
      result = zero;
    const out = [] as B[];
    while (ind > -1) {
      result = fn(xs[ind] as A, result, ind, xs);
      out.push(result);
      ind--;
    }
    return out;
  },

  $scanr = curry(scanr);
