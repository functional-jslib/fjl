import {append} from "./append";
import {difference} from "./difference";
import {reduce} from "./utils";

export const

  /**
   * Returns the complement of list 0 and the reset of the passed in arrays.
   */
  complement = <T>(...arrays: T[][]): T[] => {
    if (!arrays.length) return [];
    const [arr0] = arrays;
    return reduce((agg: T[], arr: T[]) =>
      append(agg, difference(arr, arr0)), [], arrays);
  },

  /**
   * Returns the complement of list 0 and the reset of the passed in arrays.
   */
  $complement = <T>(xs1: T[]) =>
    (xs2: T[], ...arrays: T[][]): T[] => complement(xs1, xs2, ...arrays)

;
