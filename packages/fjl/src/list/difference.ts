import {curry, CurryOf2} from "../function/curry";
import {reduce} from "./utils";
import {sliceCopy} from "./utils/sliceCopy";
import {includes, Slice} from "../platform/slice";

export type Difference<Functor> = CurryOf2<Functor, Functor, Functor>

export const

  $difference = <T>(array1: Slice<T>, array2: Slice<T>): Slice<T> => {
    // @todo augment this method with max length and min length ordering on op
    if (array1 && !array2) {
      return sliceCopy(array1);
    } else if (!array1 && array2 || (!array1 && !array2)) {
      return [];
    }
    return reduce((agg, elm) =>
        !includes(array2, elm) ? (agg.push(elm), agg) : agg
      , [], array1);
  },

  /**
   * Returns the difference of list 1 from list 2.
   * @note The `difference` operation here is non-associative;  E.g., `a - b` is not equal to `b - a`;
   * @function module:list.difference
   * @param array1 {Array}
   * @param array2 {Array}
   * @returns {Array}
   */
  difference: Difference<Slice<any>> = curry($difference) as Difference<Slice<any>>;
