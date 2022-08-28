import {intersperse} from "./intersperse";
import {concat} from "./concat";
import {Slice} from "../types";

export const

  /**
   * `intercalate(xs, xss))` is equivalent to (concat (intersperse (xs, xss)) -
   *   It inserts the list `xs` in between the lists in `xss` and concatenates
   *   the result.
   */
  intercalate = <T>(xs: Slice<T>, xss: Slice<T>[]): Slice<T> => {
    const rslt = intersperse(xs, xss);
    return !rslt.length ? rslt : concat(rslt);
  },

  $intercalate = <T>(xs: Slice<T>) =>
    (xss: Slice<T>[]): Slice<T> => intercalate(xs, xss)
;
