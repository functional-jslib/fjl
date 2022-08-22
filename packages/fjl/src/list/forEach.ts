import {length} from "./length";
import {ForEachOp} from "../types";

export const

  /**
   * For each function (same as `[].forEach` except in functional format).
   */
  forEach = <T>(fn: ForEachOp<T, T[]>, list: T[]): void => {
    const limit = length(list);
    if (!limit) {
      return;
    }
    let ind = 0;
    for (; ind < limit; ind += 1) {
      fn(list[ind], ind, list);
    }
  },

  $forEach = <T>(fn: ForEachOp<T, T[]>) =>
    (list: T[]): void => forEach(fn, list)

;
