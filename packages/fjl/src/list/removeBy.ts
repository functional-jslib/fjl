import {findIndex} from "./findIndex";
import {splitAt} from "./splitAt";
import {append} from "./append";
import {tail} from "./tail";
import {sliceCopy} from "./utils/sliceCopy";
import {BinaryPred} from "../types";

export const

  /**
   * Behaves the same as `remove`, but takes a user-supplied equality predicate.
   */
  removeBy = <T>(pred: BinaryPred<T>, x: T, list: string | T[]): string | T[] => {
    const foundIndex = findIndex(item => pred(x, item), list);
    if (foundIndex > -1) {
      const parts = splitAt(foundIndex, list);
      return append(parts[0], tail(parts[1]));
    }
    return sliceCopy(list);
  },

  /**
   * Curried version of `removeBy`.
   */
  $removeBy = <T>(pred: BinaryPred<T>) =>
    (x: T) =>
      (list: string | T[]): string | T[] => removeBy(pred, x, list);
