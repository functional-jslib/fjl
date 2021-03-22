import {curry} from "../function/curry";
import {scanl} from "./scanl";
import {head} from "./head";
import {tail} from "./tail";

export const

  $scanl1 = (fn, xs) => {
    if (!xs || !xs.length) {
      return [];
    }
    return scanl(fn, head(xs), tail(xs));
  },

  /**
   * `scanl1` is a variant of `scanl` that has no starting value argument:
   * `shallowCompare(scanl1(fn, [x1, x2, ...]), [x1, fn(x1, x2), ...]) // true`
   */
  scanl1 = curry($scanl1);
