import {filter} from "./filter";
import {append} from "./append";
import {includes} from "./includes";

/**
 * Creates a union of arrays.
 */
export const union = <T>(arr1: T[], arr2: T[]): T[] =>
    append(arr1,
      filter(elm => !includes(arr1, elm), arr2)
    ),

  /**
   * Curried version of `union`.
   */
  $union = <T>(arr1: T[]) =>
    (arr2: T[]): T[] => union(arr1, arr2)
;
