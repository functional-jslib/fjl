import {Ternary} from "../types";

export const

  /**
   * "For each" function - same as `[].forEach` except for iterables (strings, `Map`s, ...) in general.
   */
  forEach = <T, TS extends Iterable<T>>(fn: Ternary<T, number, TS>, iter: TS): void => {
    if (!iter) return;
    let ind = 0;
    for (const x of iter) {
      fn(x, ind++, iter);
    }
  },

  $forEach = <T, TS extends Iterable<T>>(fn: Ternary<T, number, TS>) =>
    (iter: TS): void => forEach(fn, iter)

;
