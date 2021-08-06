import {curry, CurryOf2} from "../../function/curry";
import {slice, Slice} from "../../platform/slice";

export const

  /**
   * Slices from index `0` to given index.
   */
  sliceTo = <T extends Slice>(toInd: number, xs: T): T => slice(0, toInd, xs) as T,

  /**
   * Curried version of `sliceTo`.
   */
  $sliceTo = curry(sliceTo) as CurryOf2<number, Slice, Slice>

;
