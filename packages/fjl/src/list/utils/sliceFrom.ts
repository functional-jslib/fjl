import {slice} from "../../platform/slice";
import {Slice} from "../../types";

export const

  /**
   * Returns a slice of the given list from `startInd` to the end of the list.
   */
  sliceFrom = <T, TS extends Slice<T>>(startInd: number, xs: TS): TS =>
    slice(startInd, undefined, xs) as typeof xs,

  /**
   * Curried version of `sliceFrom`.
   */
  $sliceFrom = <T, TS extends Slice<T>>(startInd: number) =>
    (xs: TS): TS => sliceFrom(startInd, xs)
;
