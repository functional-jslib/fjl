import {slice} from "../../platform/slice";

export const

  /**
   * Slices from index `0` to given index.
   */
  sliceTo = <T>(toInd: number, xs: T[]): T[] =>
    slice(0, toInd, xs) as typeof xs,

  /**
   * Curried version of `sliceTo`.
   */
  $sliceTo = <T>(toInd: number) =>
    (xs: T[]): T[] => sliceTo(toInd, xs)

;
