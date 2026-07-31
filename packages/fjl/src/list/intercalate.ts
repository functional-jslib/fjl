import {intersperse} from "./intersperse";
import {concat} from "./concat";

export const

  /**
   * `intercalate(xs, xss))` is equivalent to (concat (intersperse (xs, xss)) -
   *   It inserts the list `xs` in between the lists in `xss` and concatenates
   *   the result.
   */
  intercalate = <T>(xs: string | T[], xss: (string | T[])[]): string | T[] => {
    const rslt = intersperse(xs, xss);
    return !rslt.length ? rslt : concat(rslt);
  },

  $intercalate = <T>(xs: string | T[]) =>
    (xss: (string | T[])[]): string | T[] => intercalate(xs, xss)
;
