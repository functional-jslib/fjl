import {length} from "./length";
import {slice} from "../platform/slice";

export const

  /**
   * Returns all tail segments of the argument, including the argument;  E.g.,
   * ```
   * shallowEquals(tails('abc'), ['abc', 'bc', 'c',''])
   * ```
   */
  tails = <T>(xs: T[]): T[] => {
    let limit = length(xs),
      ind = 0,
      agg: [any[]] | any[] = [];
    if (!limit) {
      return [];
    }
    for (; ind <= limit; ind += 1) {
      agg.push(slice(ind, limit, xs));
    }
    return agg;
  };
