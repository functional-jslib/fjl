import {curry} from "../function/curry";
import {last} from "./last";
import {init} from "./init";
import {scanr, ScanrOp} from "./scanr";
import {Slice} from "../types";

export const

  /**
   * Same as `scanr` but takes no zero/accumulator value.
   */
  scanr1 = <T>(fn: ScanrOp<T, T>, xs: Slice<T>): T[] => {
    if (!xs || !xs.length) {
      return [];
    }
    return scanr(fn, last(xs), init(xs));
  },

  $scanr1 = curry(scanr1);
