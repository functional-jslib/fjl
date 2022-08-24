import {includes} from "../platform/slice";
import {filter} from "./filter";

export const

  /**
   * Performs an intersection on list one with elements from list two.
   */
  intersect = <T>(arr1: T[], arr2: T[]): T[] =>
    (!arr1 && !arr2) || !arr1 || !arr2  ? [] :
      filter(elm => includes(arr2, elm), arr1),

  $intersect = <T>(arr1: T[]) =>
    (arr2: T[]): T[] => intersect(arr1, arr2)
