import {intersperse} from "./intersperse";
import {concat} from "./concat";

export const

  /**
   * `intercalate(xs, xss))` is equivalent to (concat (intersperse (xs, xss)) -
   *   It inserts the list `xs` in between the lists in `xss` and concatenates
   *   the result.  An empty `xss` gives an empty list of the same type as `xs`.
   */
  intercalate = <T>(xs: string | T[], xss: (string | T[])[]): string | T[] => {
    const rslt = intersperse(xs, xss);
    return !rslt.length ? (typeof xs === 'string' ? '' : []) : concat(rslt);
  },

  $intercalate = <T>(xs: string | T[]) =>
    (xss: (string | T[])[]): string | T[] => intercalate(xs, xss)
;
