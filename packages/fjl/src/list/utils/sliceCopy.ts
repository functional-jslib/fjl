import {sliceFrom} from "./sliceFrom";
import {Slice} from "../../types";

export const

  /**
   * Returns a copy of a slice (E.g., an array and/or a string).
   */
  sliceCopy = <T, TS extends Slice<T>>(xs: TS): TS => sliceFrom(0, xs)

;
