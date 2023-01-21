import {findIndex} from "./findIndex";
import {$equal} from "../boolean";
import {Slice} from "../types";

export const

  /**
   * Checks if list `xs1` is a suffix of list `xs2`
   */
  isSuffixOf = <T, TS extends Slice<T>>(xs2: TS, xs1: TS): boolean => {
    const limit1 = xs1.length,
      limit2 = xs2.length;
    if (limit2 < limit1 || !limit1 || !limit2 || findIndex($equal(xs1[0]), xs2) === -1) {
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
  $isSuffixOf = <T, TS extends Slice<T>>(xs2: TS) =>
    (xs1: TS): boolean => isSuffixOf(xs2, xs1)

;
