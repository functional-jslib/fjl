import {curry, CurryOf2} from "../../function/curry";
import {slice} from "../../platform/slice";
import {Slice} from "../../types";

export const

  /**
   * Slices from index `0` to given index.
   */
  sliceTo = <T = any, T2 extends Slice<T> = Slice<T>>(toInd: number, xs: T2): T2 => slice(0, toInd, xs) as T2,

  /**
   * Curried version of `sliceTo`.
   */
  $sliceTo = curry(sliceTo) as CurryOf2<number, Slice, Slice>

;
