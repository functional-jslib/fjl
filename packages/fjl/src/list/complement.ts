import {difference} from "./difference";
import {reduce} from "./utils";

export const

  /**
   * Returns the complement of an array and one or more other arrays.
   */
  complement = <T>(...arrays: T[][]): T[] => {
    const arr0 = arrays.shift();
    return reduce((agg: T[], arr: T[]) => {
        agg.push(...difference(arr, arr0));
        return agg;
    }, arr0.slice(0, 0), arrays);
  },

  /**
   * Curried version of `complement`.
   */
  $complement = <T>(xs1: T[]) =>
    (xs2: T[], ...arrays: T[][]): T[] =>
      complement(xs1, xs2, ...arrays)

;
