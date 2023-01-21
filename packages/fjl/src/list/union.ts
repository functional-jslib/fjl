import {unionBy} from "./unionBy";
import {includes} from "./includes";

/**
 * Creates a union of arrays.
 */
export const union = <T>(arr1: T[], arr2: T[]): T[] =>
  unionBy((xs, x) => !includes(xs, x),
    arr1, arr2),

  /**
   * Curried version of `union`.
   */
  $union = <T>(arr1: T[]) =>
    (arr2: T[]): T[] => union(arr1, arr2)
;
