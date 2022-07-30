import {length} from "./length";
import {indexOf,} from "../platform/slice";
import {Slice} from "../types";

export const

  /**
   * Checks if list `xs1` is a prefix of list `xs2`
   */
  isPrefixOf = <T>(xs1: Slice<T>, xs2: Slice<T>): boolean => {
    const limit1 = length(xs1),
      limit2 = length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs2, xs1[0]) === -1) {
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
