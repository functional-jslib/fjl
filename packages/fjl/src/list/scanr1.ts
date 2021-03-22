import {curry} from "../function/curry";
import {last} from "./last";
import {init} from "./init";
import {scanr} from "./scanr";

export const

  $scanr1 = (fn, xs) => {
    if (!xs || !xs.length) {
      return [];
    }
    return scanr(fn, last(xs), init(xs));
  },

  /**
   * Same as `scanr` but takes no zero/accumulator value.
   * @function module:list.scanr1
   * @param fn {Function}
   * @param xs {Array}
   * @returns {Array|*}
   */
  scanr1 = curry($scanr1);
