import {Slice} from "../types";
import {of} from "../object";
import {pushN} from "./pushN";
import {append} from "./append";

export const

  /**
   * Takes an element and a list and `intersperses' that element between the
   *  elements of the list.
   */
  intersperse = <T = string | any>(between: T, xs: Slice<T>): Slice<T> => {
    const limit = xs?.length;
    if (!limit) return of(xs);
    const appender = Array.isArray(xs) ? pushN : append,
      lastInd = limit - 1;
    let out = of(xs);
    for (let i = 0; i < limit; i += 1) {
      if (i === lastInd) {
        out = appender(out, xs[i]);
      } else {
        out = appender(out, between);
      }
    }
    return out;
  },

  $intersperse = <T>(between: T) =>
    (xs: Slice<T>): Slice<T> => intersperse(between, xs)

;
