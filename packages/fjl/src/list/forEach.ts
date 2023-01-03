import {ForEachOp} from "../types";

export const

  /**
   * "For each" function - same as `[].forEach` except for iterables (strings, `Map`s, ...) in general.
   */
  forEach = <T>(fn: ForEachOp, iter: Iterable<T>): void => {
    if (!iter) return;
    let ind = 0;
    for (const x of iter) {
      fn(x, ind++, iter);
    }
  },

  $forEach = <T>(fn: ForEachOp) =>
    (iter: Iterable<T>): void => forEach(fn, iter)

;
