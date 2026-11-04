import {indexOf} from "../_platform/slice";

export const

  /**
   * Returns the index of the first occurrence of `x`, or `undefined` when there isn't one.
   * Takes the list last, as with Haskell's `elemIndex`.  Use `indexOf` for `-1` when there's no
   * match.
   */
  elemIndex = <T>(x: T, xs: string | T[]): number | undefined => {
    const foundInd = indexOf(x, xs);
    return foundInd !== -1 ? foundInd : undefined;
  },

  $elemIndex = <T>(x: T) =>
    (xs: string | T[]): number | undefined => elemIndex(x, xs)
;
