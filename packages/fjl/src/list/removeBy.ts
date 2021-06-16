import {curry} from "../function/curry";
import {findIndex} from "./findIndex";
import {splitAt} from "./splitAt";
import {append} from "./append";
import {tail} from "./tail";
import {sliceCopy} from "./utils/sliceCopy";
import {BinaryPred, Slice} from "../types";

export const

  /**
   * Behaves the same as `remove`, but takes a user-supplied equality predicate.
   */
  removeBy = <T>(pred: BinaryPred<T>, x: T, list: Slice<T>): Slice<T> => {
    const foundIndex = findIndex(item => pred(x, item), list) as number;
    if (foundIndex > -1) {
      const parts = splitAt(foundIndex, list);
      return append(parts[0], tail(parts[1]));
    }
    return sliceCopy(list);
  },

  $removeBy = curry(removeBy);