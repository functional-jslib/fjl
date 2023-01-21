import {sliceFrom} from "./sliceFrom";
import {Slice} from "../../types";

export const

  /**
   * Returns a copy of a slice (E.g., an array and/or a string).
   */
  sliceCopy = (xs: Slice): typeof xs =>
    sliceFrom(0, xs)

;
