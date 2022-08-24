import {NumberIndexable} from "../types";
import {$equal} from "../boolean";
import {findIndex} from "./findIndex";

export const
  /**
   * Checks if list `xs1` is a sub-sequence of list `xs2`
   */
  isSubsequenceOf = <T, TS extends NumberIndexable<T>>(xs1: TS, xs2: TS): boolean => {
    const len = Math.pow(2, xs2.length),
      lenXs1 = xs1.length;
    let foundLen,
      i;
    for (i = 0; i < len; i += 1) {
      foundLen = 0;
      for (let j = 0; j < len; j += 1) {
        if (i & (1 << j) && findIndex($equal(xs2[j]), xs1) > -1) {
          foundLen += 1;
        }
        if (foundLen === lenXs1) {
          return true;
        }
      }
    }
    return false;
  },

  $isSubsequenceOf = <T, TS extends NumberIndexable<T>>(xs1: TS) =>
    (xs2: TS): boolean => isSubsequenceOf(xs1, xs2)

;
