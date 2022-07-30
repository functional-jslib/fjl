import {slice} from "../../platform/slice";
import {Slice} from "../../types";

export const

  /**
   * Returns a slice of the given list from `startInd` to the end of the list.
   */
  sliceFrom = <T = any, T2 extends Slice<T> = Slice<T>>(startInd: number, xs: T2): T2 => slice(startInd, undefined, xs) as T2,

  /**
   * Curried version of `sliceFrom`.
   */
  $sliceFrom = <T = any, T2 extends Slice<T> = Slice<T>>(startInd: number) =>
    (xs: T2): T2 => sliceFrom(startInd, xs)
;
