import {curry} from "../function/curry";
import {length} from "./length";
import {reduce, toShortest} from "./utils";
import {push} from "./push";
import {Slice} from "../types/native";

export const

  /**
   * zip takes two lists and returns a list of corresponding pairs.
   * If one input list is short, excess elements of the longer list are discarded.
   * @haskellType `zip :: [a] -> [b] -> [(a, b)]`
   * @function module:list.zip
   * @param arr1 {Array}
   * @param arr2 {Array}
   * @returns {Array<Array<*,*>>}
   */
  zip = <T, T2>(arr1: T[], arr2: T2[]): [T, T2][] => {
    if (!length(arr1) || !length(arr2)) {
      return [];
    }
    const [a1, a2] = toShortest(arr1, arr2) as Slice<T>[];
    return reduce((agg, item, ind) => push([item, a2[ind]], agg),
      [], a1);
  },

  $zip = curry(zip);
