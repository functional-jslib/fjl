import {slice} from "../../platform/slice";
import {Slice} from "../../types";

export const

  /**
   * Slices from index `0` to given index.
   */
  sliceTo = (toInd: number, xs: Slice): typeof xs =>
    slice(0, toInd, xs),

  /**
   * Curried version of `sliceTo`.
   */
  $sliceTo = (toInd: number) => (xs: Slice): typeof xs =>
    sliceTo(toInd, xs)

;
