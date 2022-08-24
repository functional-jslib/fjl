import {indexOf,} from "../platform/slice";
import {Slice} from "../types";
import {findIndex} from "./findIndex";
import {$equal} from "../boolean";

export const

  /**
   * Checks if list `xs1` is a prefix of list `xs2`
   */
  isPrefixOf = <T, TS extends Slice<T>>(xs1: TS, xs2: TS): boolean => {
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

  $isPrefixOf = <T, TS extends Slice<T>>(xs1: TS) =>
    (xs2: TS): boolean => isPrefixOf(xs1, xs2);
