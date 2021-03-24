import {curry} from "../function/curry";
import {last} from "./last";
import {init} from "./init";
import {scanr} from "./scanr";

export const

  /**
   * Same as `scanr` but takes no zero/accumulator value.
   */
  scanr1 = (fn, xs) => {
    if (!xs || !xs.length) {
      return [];
    }
    return scanr(fn, last(xs), init(xs));
  },

  $scanr1 = curry(scanr1);
