import {curry} from "../function/curry";
import {length} from "../platform/object";
import {indexOf, Slice} from "../platform/slice";

export const

  /**
   * Checks if list `xs1` is a suffix of list `xs2`
   */
  $isSuffixOf = <T>(xs2: Slice<T>, xs1: Slice<T>): boolean => {
    const limit1 = length(xs1),
      limit2 = length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs2, xs1[0]) === -1) {
      return false;
    }
    let ind1 = limit1 - 1,
      ind2 = limit2 - 1;
    for (; ind1 >= 0; ind1--) {
      if (xs1[ind1] !== xs2[ind2]) {
        return false;
      }
      ind2 -= 1;
    }
    return true;
  },

  /**
   * Checks if list `xs1` is a suffix of list `xs2`
   * @curried
   */
  isSuffixOf = curry($isSuffixOf);
