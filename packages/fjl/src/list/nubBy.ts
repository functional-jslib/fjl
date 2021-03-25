import {curry} from "../function/curry";
import {length} from "./length";
import {any} from "./any";
import {Slice} from "../types";

export const

  /**
   * The nubBy function behaves just like nub, except it uses a user-supplied equality predicate.
   */
  nubBy = <T>(pred, list: Slice<T>): Slice<T> => {
    if (!length(list)) {
      return [];
    }
    const limit = length(list);
    let ind = 0,
      currItem;
    const out: any[] = [],
      anyOp = (storedItem: T): boolean => pred(currItem, storedItem);
    for (; ind < limit; ind += 1) {
      currItem = list[ind];
      if (any(anyOp, out)) {
        continue;
      }
      out.push(currItem);
    }
    return out;
  },

  $nubBy = curry(nubBy);
