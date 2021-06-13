import {curry} from "../function";
import {isString} from "../object/is";
import {intersperse} from "./intersperse";
import {concat} from "./concat";
import {Slice} from "../types";

export const

  /**
   * `intercalate(xs, xss))` is equivalent to (concat (intersperse (xs, xss)) -
   *   It inserts the list `xs` in between the lists in `xss` and concatenates
   *   the result.
   */
  intercalate = <T>(xs: Slice<T>, xss: Slice<Slice<T>>): Slice<T> => {
    if (isString(xss)) {
      return intersperse(xs, xss) as Slice<T>;
    }
    return concat(intersperse(xs, xss) as Slice<T>[]);
  },

  $intercalate = curry(intercalate);
