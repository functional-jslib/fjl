import {slice} from "../../platform/slice";

export const

  /**
   * Returns a slice of the given list from `startInd` to the end of the list.
   */
  sliceFrom = (startInd: number, xs) =>
    slice(startInd, undefined, xs),

  /**
   * Curried version of `sliceFrom`.
   */
  $sliceFrom = (startInd: number) =>
    xs => sliceFrom(startInd, xs)
;
