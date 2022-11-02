import {Slice} from "../types";
import {of} from "../object";

export const

  /**
   * Takes an element and a list and `intersperses' that element between the
   *  elements of the list.
   */
  intersperse = <T = string | any>(between: T, xs: Slice<T>): Slice<T> => {
    const limit = xs.length;
    if (!limit) return of(xs);
    const isArrayXs = Array.isArray(xs),
      lastInd = limit - 1;
    let out = of(xs);
    for (let i = 0; i < limit; i += 1) {
      if (i === lastInd) {
        if (isArrayXs) (out as T[]).push(xs[i]);
        else out = out.concat(xs[i]);
      } else {
        if (isArrayXs) (out as T[]).push(xs[i], between);
        else out = out.concat(xs[i], between as unknown as any);
      }
    }
    return out;
  },

  $intersperse = <T>(between: T) =>
    (xs: Slice<T>): Slice<T> => intersperse(between, xs)

;
