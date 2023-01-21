import {zipN} from "./zipN";

export const zip4 = <T = any>(arr1: T[], arr2: T[], arr3: T[], arr4: T[]): T[][] => zipN(arr1, arr2, arr3, arr4),

  $zip4 = <T = any>(arr1: T[]) =>
    (arr2: T[]) =>
      (arr3: T[]) =>
        (arr4: T[]): T[][] => zip4(arr1, arr2, arr3, arr4);
