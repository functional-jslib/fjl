import {Slice} from "../types";

export const
  /**
   * The inits function returns all initial segments of the argument (shortest first).  For example:
   *
   * ```
   * shallowEquals(inits('abc'), ['','a','ab','abc'])
   * ```
   */
  inits = (xs: Slice): (typeof xs)[] => {
    const limit = xs?.length,
      agg = [];
    if (!limit) return agg;
    for (let ind = 0; ind <= limit; ind += 1) {
      agg.push(xs.slice(0, ind));
    }
    return agg;
  };
