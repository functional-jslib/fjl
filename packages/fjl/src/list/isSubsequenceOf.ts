import {$equal} from "../boolean";
import {findIndex} from "./findIndex";
import {NumberIndexable} from "../types";
import {isNullish} from "../object";

export const
  /**
   * Checks if list one is a subsequence of list two.
   */
  isSubsequenceOf = <T>(xs1: NumberIndexable<T>, xs2: NumberIndexable<T>): boolean => {
    if (isNullish(xs1) || isNullish(xs2)) return false;
    const len = Math.pow(2, xs2.length),
      lenXs1 = xs1.length
    ;
    for (let i = 0; i < len; i += 1) {
      let foundLen = 0;
      for (let j = 0; j < len; j += 1) {
        if (i & (1 << j) && findIndex($equal(xs2[j]), xs1) > -1)
          foundLen += 1;
        if (foundLen === lenXs1)
          return true;
      }
    }
    return false;
  },

  $isSubsequenceOf = <T>(xs1: NumberIndexable<T>) =>
    (xs2: NumberIndexable<T>): boolean => isSubsequenceOf(xs1, xs2)

;
