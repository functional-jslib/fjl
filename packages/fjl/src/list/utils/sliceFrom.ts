import {curry, CurryOf2} from "../../function/curry";
import {slice, Slice} from "../../platform/slice";

export const

  /**
   * Returns a slice of the given list from `startInd` to the end of the list.
   */
  sliceFrom = <T extends Slice>(startInd: number, xs: T): T => slice(startInd, undefined, xs) as T,

  /**
   * Curried version of `sliceFrom`.
   */
  $sliceFrom = curry(sliceFrom) as CurryOf2<number, Slice, Slice>
;
