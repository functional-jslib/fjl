import {curry} from "../function/curry";
import {length} from "../platform/object";
import {ForEachOp} from "../platform";
import {Slice} from "../types";

export const

  $forEach = <T>(fn: ForEachOp<T | Slice<T>, Slice<T>>, list: Slice<T>): void => {
    const limit = length(list);
    if (!limit) {
      return;
    }
    let ind = 0;
    for (; ind < limit; ind += 1) {
      fn(list[ind], ind, list);
    }
  },

  /**
   * For each function (same as `[].forEach` except in functional format).
   * @function module:list.forEach
   * @param fn {Function} - Operation (`(element, index, list) => {...}`, etc.)
   * @param xs {(Array|String)}
   * @returns {void}
   */
  forEach = curry($forEach)

;
