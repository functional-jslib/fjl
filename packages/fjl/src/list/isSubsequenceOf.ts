import {curry2} from "../function/curry";
import {length} from "../platform/object";
import {indexOf, Slice} from "../platform/slice";

export const
  /**
   * Checks if list `xs1` is a sub-sequence of list `xs2`
   */
  isSubsequenceOf = <T>(xs1: Slice<T>, xs2: Slice<T>): boolean => {
    const len = Math.pow(2, length(xs2)),
      lenXs1 = length(xs1);
    let foundLen,
      i;
    for (i = 0; i < len; i += 1) {
      foundLen = 0;
      for (let j = 0; j < len; j += 1) {
        if (i & (1 << j) && indexOf(xs1, xs2[j]) > -1) {
          foundLen += 1;
        }
        if (foundLen === lenXs1) {
          return true;
        }
      }
    }
    return false;
  },

  $isSubsequenceOf = curry2(isSubsequenceOf);
