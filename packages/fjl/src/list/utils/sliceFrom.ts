import {Slice} from "../../types";

export const

  /**
   * Returns a slice of the given list from `startInd` to the end of the list.
   */
  sliceFrom = (startInd: number, xs: Slice): typeof xs => xs.slice(startInd),

  /**
   * Curried version of `sliceFrom`.
   */
  $sliceFrom = (startInd: number) =>
    (xs: Slice): typeof xs =>
      sliceFrom(startInd, xs)
;
