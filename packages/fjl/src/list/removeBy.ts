import {findIndex} from "./findIndex";
import {sliceCopy} from "./utils/sliceCopy";
import {fromItems, toItems} from "./utils/items";
import {BinaryPred} from "../types";

export const

  /**
   * Behaves the same as `remove`, but takes a user-supplied equality predicate, called as
   * `pred(x, item)`.
   */
  removeBy = <T>(pred: BinaryPred<T>, x: T, list: string | T[]): string | T[] => {
    const items = toItems(list) as T[],
      foundIndex = findIndex((item: T) => pred(x, item), items);
    if (foundIndex > -1) {
      items.splice(foundIndex, 1);
      return fromItems(list, items);
    }
    return sliceCopy(list);
  },

  /**
   * Curried version of `removeBy`.
   */
  $removeBy = <T>(pred: BinaryPred<T>) =>
    (x: T) =>
      (list: string | T[]): string | T[] => removeBy(pred, x, list);
