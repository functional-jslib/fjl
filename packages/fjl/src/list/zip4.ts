import {zipN} from "./zipN";

export const /**
   * @haskellType `zip4 :: [a] -> [b] -> [c] -> [d] -> [(a, b, c, d)]`
   * @function module:list.zip4
   * @param arr1 {Array}
   * @param arr2 {Array}
   * @param arr3 {Array}
   * @param arr4 {Array}
   * @returns {Array<Array<*,*>>}
   */
  zip4 = <T = any>(arr1: T[], arr2: T[], arr3: T[], arr4: T[]): T[][] => zipN(arr1, arr2, arr3, arr4),

  $zip4 = <T = any>(arr1: T[]) =>
    (arr2: T[]) =>
      (arr3: T[]) =>
        (arr4: T[]): T[][] => zip4(arr1, arr2, arr3, arr4);
