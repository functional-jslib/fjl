import {curry, CurryOf2} from "../../function/curry";
import {slice} from "../../platform/slice";
import {SliceInterface} from "../../types";

export const

  /**
   * Returns a slice of the given list from `startInd` to the end of the list.
   */
  sliceFrom = <T = any, T2 extends SliceInterface<T>>(startInd: number, xs: T2): T2 => slice(startInd, undefined, xs) as T2,

  /**
   * Curried version of `sliceFrom`.
   */
  $sliceFrom = curry(sliceFrom) as CurryOf2<number, SliceInterface, SliceInterface>
;
