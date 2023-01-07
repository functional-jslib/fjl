import {reduce} from "./utils";
import {Slice} from "../types";

export const

  /**
   * Returns the difference of list 1 from list 2.
   * @reference https://mathworld.wolfram.com/SetDifference.html
   */
  difference = <T = any>(array1: Slice<T>, array2: Slice<T>): Slice<T> => {
    if (array1 && !array2) {
      return array1.slice(0);
    } else if (!array1 && array2 || (!array1 && !array2)) {
      return [];
    }
    return reduce((agg, elm) =>
        !array2.includes(elm) ? (agg.push(elm), agg) : agg
      , [], array1);
  },

  /**
   * Curried version of `$difference`.
   */
  $difference = <T = any>(array1: Slice<T>) =>
    (array2: Slice<T>): Slice<T> => difference(array1, array2);
