import {NumberIndexable} from "../types";

export const

  /**
   * Checks if list `xs1` is an infix of list `xs2`
   */
  isInfixOf = <T>(xs1: NumberIndexable<T>, xs2: NumberIndexable<T>): boolean => {
    const limit1 = xs1.length,
      limit2 = xs2.length;

    if (limit2 < limit1 || !limit1 || !limit2) return false;

    let ind1,
      foundLen;

    for (let ind = 0; ind < limit2; ind += 1) {
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

  $isInfixOf = <T>(xs1: NumberIndexable<T>) =>
    (xs2: NumberIndexable<T>): boolean => isInfixOf(xs1, xs2)

;
