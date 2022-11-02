import {slice} from "../../platform/slice";
import {Slice} from "../../types";

export const

  /**
   * Slices from index `0` to given index.
   */
  sliceTo = <T>(toInd: number, xs: Slice<T>): Slice<T> =>
    slice(0, toInd, xs),

  /**
   * Curried version of `sliceTo`.
   */
  $sliceTo = <T>(toInd: number) =>
    (xs: Slice<T>): Slice<T> => sliceTo(toInd, xs)

;
