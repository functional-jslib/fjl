import {zipN} from "./zipN";

export const zip3 = <T = any>(arr1: T[], arr2: T[], arr3: T[]): T[][] => zipN(arr1, arr2, arr3),

  $zip3 = <T = any>(arr1: T[]) =>
    (arr2: T[]) =>
      (arr3: T[]): T[][] => zip3(arr1, arr2, arr3);
