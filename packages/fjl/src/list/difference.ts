import {curry, CurryOf2} from "../function/curry";
import {reduce} from "./utils";
import {sliceCopy} from "./utils/sliceCopy";
import {includes, Slice} from "../platform/slice";

export type Difference<Functor> = CurryOf2<Functor, Functor, Functor>

export const

  /**
   * Returns the difference of list 1 from list 2.
   * @reference https://mathworld.wolfram.com/SetDifference.html
   */
  $difference = <T>(array1: Slice<T>, array2: Slice<T>): Slice<T> => {
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
   * Curried version of `$difference`.
   */
  difference: Difference<Slice<any>> = curry($difference) as Difference<Slice<any>>;
