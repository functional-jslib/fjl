import {NumberIndexable} from "../types";

export const

  /**
   * Checks if list `xs1` is an infix of list `xs2`
   */
  isInfixOf = <T, TS extends NumberIndexable<T>>(xs1: TS, xs2: TS): boolean => {
    const limit1 = xs1.length,
      limit2 = xs2.length;
    if (limit2 < limit1 || !limit1 || !limit2) {
      return false;
    }
    let ind1,
      foundLen,
      ind = 0;
    for (; ind < limit2; ind += 1) {
      foundLen = 0;
      for (ind1 = 0; ind1 < limit1; ind1 += 1) {
        if (xs2[ind1 + ind] === xs1[ind1]) {
          foundLen += 1;
        }
        if (foundLen === limit1) {
          return true;
        }
      }
    }
    return false;
  },

  $isInfixOf = <T, TS extends NumberIndexable<T>>(xs1: TS) =>
    (xs2: TS): boolean => isInfixOf(xs1, xs2)

;
