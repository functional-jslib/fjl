import {last} from "./last";
import {init} from "./init";
import {scanr, ScanrOp} from "./scanr";

export const

  /**
   * Same as `scanr` but takes no zero/accumulator value.
   */
  scanr1 = <T>(fn: ScanrOp<T, T>, xs: T[]): T[] => {
    if (!xs || !xs.length) {
      return [];
    }
    return scanr(fn, last(xs), init(xs));
  },

  $scanr1 = <T>(fn: ScanrOp<T, T>) =>
    (xs: T[]): T[] => scanr1(fn, xs);
