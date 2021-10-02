import {Slice} from "../../types";
import {sliceFrom} from "./sliceFrom";

export const

  /**
   * Returns a copy of a slice (E.g., an array and/or a string).
   */
  sliceCopy = <T = any, T2 extends Slice<T> = Slice<T>>(xs: T2): T2 => sliceFrom(0, xs)

;
