import {any} from "./any";
import {BinaryPred} from "../types";

export const

  /**
   * The nubBy function behaves just like nub, except it uses a user-supplied equality predicate.
   */
  nubBy = <T>(pred: BinaryPred<T>, list: T[]): T[] => {
    const len = list.length;

    if (!len) {
      return [];
    }

    let ind = 0,
      currItem: T;

    const out: any[] = [],
      anyOp = (storedItem: T): boolean => pred(currItem, storedItem);

    for (; ind < len; ind += 1) {
      currItem = list[ind];

      if (any(anyOp, out)) {
        continue;
      }
      out.push(currItem);
    }
    return out;
  },

  $nubBy =  <T>(pred: BinaryPred<T>) =>
    (list: T[]): T[] =>
      nubBy(pred, list)

;
