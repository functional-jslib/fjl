import {slice} from "../../platform/slice";
import {Slice} from "../../types";

export const

  /**
   * Slices from index `0` to given index.
   */
  sliceTo = <T = any, T2 extends Slice<T> = Slice<T>>(toInd: number, xs: T2): T2 =>
    slice(0, toInd, xs) as typeof xs,

  /**
   * Curried version of `sliceTo`.
   */
  $sliceTo = <T = any, T2 extends Slice<T> = Slice<T>>(toInd: number) =>
    (xs: T2): T2 => sliceTo(toInd, xs)

;
