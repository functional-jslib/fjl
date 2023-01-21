import {length} from "./length";
import {reduce, toShortest} from "./utils";
import {push} from "./push";

/**
 * zip takes two lists and returns a list of corresponding pairs.
 * If one input list is short, excess elements of the longer list are discarded.
 */
export const zip = <T, T2>(arr1: T[], arr2: T2[]): [T, T2][] => {
    if (!length(arr1) || !length(arr2)) {
      return [];
    }
    const [a1, a2] = toShortest<any>(arr1, arr2) as T[][];
    return reduce((agg, item, ind) => push([item, a2[ind]], agg),
      [], a1);
  },

  $zip = <T, T2>(arr1: T[]) =>
    (arr2: T2[]): [T, T2][] => zip(arr1, arr2)

;
