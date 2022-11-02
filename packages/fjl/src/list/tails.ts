import {slice} from "../platform/slice";
import {Slice} from "../types";
import {of} from "../object";

export const

  /**
   * Returns all tail segments of the argument, including the argument;  E.g.,
   * ```
   * shallowEquals(tails('abc'), ['abc', 'bc', 'c',''])
   * ```
   */
  tails = <T, TS extends Slice<T>>(xs: TS): TS[] => {
    const limit = xs.length;
    if (!limit) {
      return [of(xs)];
    }
    const agg: TS[] = [];
    for (let ind = 0; ind <= limit; ind += 1) {
      agg.push(slice(ind, limit, xs));
    }
    return agg;
  };
