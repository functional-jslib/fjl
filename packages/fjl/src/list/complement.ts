import {append} from "./append";
import {difference} from "./difference";

export const

  /**
   * Returns the complement of list 0 and the reset of the passed in arrays.
   */
  complement = <T>(...arrays: T[][]): T[] => {
    if (!arrays.length) return [];
    const [arr0] = arrays;
    return arrays.reduce((agg: T[], arr: T[]) =>
      append(agg, difference(arr, arr0)), []);
  },

  /**
   * Returns the complement of list 0 and the reset of the passed in arrays.
   */
  $complement = <T>(xs1: T[]) =>
    (xs2: T[], ...arrays: T[][]): T[] => complement(xs1, xs2, ...arrays)

;
