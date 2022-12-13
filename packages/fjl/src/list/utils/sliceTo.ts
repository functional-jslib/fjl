import {slice} from "../../platform/slice";

export const

  /**
   * Slices from index `0` to given index.
   */
  sliceTo = (toInd: number, xs) => slice(0, toInd, xs),

  /**
   * Curried version of `sliceTo`.
   */
  $sliceTo = (toInd: number) => xs => sliceTo(toInd, xs)

;
