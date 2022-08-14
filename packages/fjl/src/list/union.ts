import {append} from "./append";
import {filter} from "./filter";
import {includes, } from "../platform/slice";

export const
  /**
   * Creates a union on matching elements from array1.
   * @function module:list.union
   * @param arr1 {Array}
   * @param arr2 {Array}
   * @returns {Array}
   */
  union = <T>(arr1: T[], arr2: T[]): T[] =>
    append(arr1,
      filter(elm => !includes(arr1, elm), arr2) as T[]
    ),

  $union = <T>(arr1: T[]) =>
    (arr2: T[]): T[] => union(arr1, arr2)
;
