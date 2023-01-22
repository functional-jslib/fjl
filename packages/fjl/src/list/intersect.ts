import {intersectBy} from "./intersectBy";
import {equal} from "../boolean";

export const

  /**
   * Performs an intersection on list one with elements from list two.
   */
  intersect = <T>(arr1: T[], arr2: T[]): T[] =>
    intersectBy(equal, arr1, arr2),

  $intersect = <T>(arr1: T[]) =>
    (arr2: T[]): T[] => intersect(arr1, arr2)
