import {sliceFrom} from "./sliceFrom";

export const

  /**
   * Returns a copy of a slice (E.g., an array and/or a string).
   */
  sliceCopy = (xs: string | any[]): typeof xs =>
    sliceFrom(0, xs)

;
