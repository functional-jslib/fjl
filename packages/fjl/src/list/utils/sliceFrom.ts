import {slice} from "../../platform/slice";
import {Slice} from "../../types";

export const

  /**
   * Returns a slice of the given list from `startInd` to the end of the list.
   */
  sliceFrom = (startInd: number, xs: Slice): typeof xs =>
    slice(startInd, undefined, xs),

  /**
   * Curried version of `sliceFrom`.
   */
  $sliceFrom = (startInd: number) =>
    (xs: Slice): typeof xs =>
      sliceFrom(startInd, xs)
;
