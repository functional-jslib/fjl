import {curry, CurryOf2} from "../../function/curry";
import {slice} from "../../platform/slice";
import {SliceInterface} from "../../types";

export const

  /**
   * Slices from index `0` to given index.
   */
  sliceTo = <T = any, T2 extends SliceInterface<T>>(toInd: number, xs: T2): T2 => slice(0, toInd, xs) as T2,

  /**
   * Curried version of `sliceTo`.
   */
  $sliceTo = curry(sliceTo) as CurryOf2<number, SliceInterface, SliceInterface>

;
