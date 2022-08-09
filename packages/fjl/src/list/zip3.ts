import {curry} from "../function/curry";
import {zipN} from "./zipN";

export const
  /**
   * @haskellType `zip3 :: [a] -> [b] -> [c] -> [(a, b, c)]`
   * @function module:list.zip3
   * @param arr1 {Array}
   * @param arr2 {Array}
   * @param arr3 {Array}
   * @returns {Array<Array<*,*>>}
   */
  zip3 = <T = any>(arr1: T[], arr2: T[], arr3: T[]): T[][] => zipN(arr1, arr2, arr3),

  $zip3 = <T = any>(arr1: T[]) =>
    (arr2: T[]) =>
      (arr3: T[]): T[][] => zip3(arr1, arr2, arr3);
