import {slice} from "../../platform/slice";

export const

  /**
   * Returns a slice of the given list from `startInd` to the end of the list.
   */
  sliceFrom = <T>(startInd: number, xs: T[]): T[] =>
    slice(startInd, undefined, xs) as typeof xs,

  /**
   * Curried version of `sliceFrom`.
   */
  $sliceFrom = <T>(startInd: number) =>
    (xs: T[]): T[] => sliceFrom(startInd, xs)
;
