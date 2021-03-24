import {length} from "../platform/object";
import {slice} from "../platform/slice";
import {Slice} from "../types";

export const

  /**
   * The inits function returns all initial segments of the argument, shortest first. For example,
   * ```
   * shallowEquals(tails('abc'), ['abc', 'bc', 'c',''])
   * ```
   */
  tails = <T>(xs: Slice<T>): Slice<T> => {
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
