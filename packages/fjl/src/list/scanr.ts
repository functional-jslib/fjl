import {curry} from "../function/curry";
import {length} from "./length";

export const

  /**
   * Same as `scanl` but from the right (similar to `foldr`'s relationship to 'foldl').
   * Note also `scanr`'s relationship ot `foldr`:
   * `head (scanr(fn, z, xs)) === foldr(fn, z, xs).
   */
  scanr = (fn, zero, xs) => {
    if (!xs || !length(xs)) {
      return [];
    }
    const limit = length(xs);
    let ind = limit - 1,
      result = xs[0],
      out: any[] = [];
    while (ind > -1) {
      result = fn(result, xs[ind], ind, xs);
      out.push(result);
      ind--;
    }
    return out;
  },

  $scanr = curry(scanr);
