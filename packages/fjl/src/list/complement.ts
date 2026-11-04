import {reduce} from "./foldl";

export const

  /**
   * Returns the items of the other arrays that aren't in the first array, keeping every
   * occurrence (unlike `difference`, which removes one occurrence per item).
   */
  complement = <T>(...arrays: T[][]): T[] => {
    const arr0 = arrays.shift();
    return reduce((agg: T[], arr: T[]) => {
      agg.push(...arr.filter(x => !arr0.includes(x)));
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
