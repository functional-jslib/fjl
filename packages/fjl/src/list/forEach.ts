import {length} from "./length";
import {ForEachOp, Slice} from "../types";

export const

  /**
   * For each function (same as `[].forEach` except in functional format).
   */
  forEach = <T>(fn: ForEachOp<T | Slice<T>, Slice<T>>, list: Slice<T>): void => {
    const limit = length(list);
    if (!limit) {
      return;
    }
    let ind = 0;
    for (; ind < limit; ind += 1) {
      fn(list[ind], ind, list);
    }
  },

  $forEach = <T>(fn: ForEachOp<T | Slice<T>, Slice<T>>) =>
    (list: Slice<T>): void => forEach(fn, list)

;
