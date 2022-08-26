import {intersperse} from "./intersperse";
import {concat} from "./concat";

export const

  /**
   * `intercalate(xs, xss))` is equivalent to (concat (intersperse (xs, xss)) -
   *   It inserts the list `xs` in between the lists in `xss` and concatenates
   *   the result.
   */
  intercalate = <T, TS extends T[]>(xs: TS, xss: TS[]): TS =>
    concat(intersperse(xs, xss)),

  $intercalate = <T, TS extends T[]>(xs: TS) =>
    (xss: TS[]): TS => intercalate(xs, xss)
;
