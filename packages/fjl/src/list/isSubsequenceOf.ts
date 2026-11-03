import {equal} from "../boolean";
import {NumberIndexable} from "../types";
import {isNullish} from "../object";

export const
  /**
   * Checks if list one is a subsequence of list two.
   */
  isSubsequenceOf = <T>(xs1: NumberIndexable<T>, xs2: NumberIndexable<T>): boolean => {
    if (isNullish(xs1) || isNullish(xs2)) return false;
    const lenXs1 = xs1.length,
      lenXs2 = xs2.length;
    let foundLen = 0;
    for (let i = 0; i < lenXs2 && foundLen < lenXs1; i += 1) {
      if (equal(xs1[foundLen], xs2[i])) foundLen += 1;
    }
    return foundLen === lenXs1;
  },

  $isSubsequenceOf = <T>(xs1: NumberIndexable<T>) =>
    (xs2: NumberIndexable<T>): boolean => isSubsequenceOf(xs1, xs2)

;
