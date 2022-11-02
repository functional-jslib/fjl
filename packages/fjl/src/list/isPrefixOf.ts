import {findIndex} from "./findIndex";
import {$equal} from "../boolean";
import {Slice} from "../types";

export const

  /**
   * Checks if list `xs1` is a prefix of list `xs2`
   */
  isPrefixOf = <T>(xs1: Slice<T>, xs2: Slice<T>): boolean => {
    const limit1 = xs1.length,
      limit2 = xs2.length;
    if (limit2 < limit1 || !limit1 || !limit2 || findIndex($equal(xs1[0]), xs2) === -1) {
      return false;
    }
    let ind = 0;
    for (; ind < limit1; ind++) {
      if (xs1[ind] !== xs2[ind]) {
        return false;
      }
    }
    return true;
  },

  $isPrefixOf = <T>(xs1: Slice<T>) =>
    (xs2: Slice<T>): boolean => isPrefixOf(xs1, xs2);
