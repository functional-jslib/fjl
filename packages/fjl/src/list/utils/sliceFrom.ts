import {curry, CurryOf2} from "../../function/curry";
import {$slice, Slice, SliceOf} from "../../platform/slice";

export const

  /**
   * Returns a slice of the given list from `startInd` to the end of the list.
   */
  $sliceFrom = <T>(startInd: number, xs: Slice<T>): Slice<T> =>
    $slice(startInd, undefined, xs),

  /**
   * Returns a slice of the given list from `startInd` to the end of the list.
   */
  sliceFrom = curry($sliceFrom) as CurryOf2<number, Slice, Slice>
;
