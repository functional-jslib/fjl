import {length} from "./length";
import {swap} from "./utils";
import {sliceCopy} from "./utils/sliceCopy";
import {repeat} from "./repeat";
import {Slice} from "../platform/slice";

export const

  /**
   * Returns a list of permutations for passed in list.
   *  Use caution with lists above a length of 15 (will take long due to nature of
   *  algorithm).
   */
  permutations = <T>(xs: Slice<T>): Slice<T>[] => {
    const limit = length(xs);

    if (!limit || limit === 1) {
      return [xs];
    }

    const c = repeat(limit, 0) as number[];
    let list: T[] = sliceCopy(xs) as T[],
      i = 0;

    const out = [list];

    for (; i < limit; i++) {
      if (c[i] < i) {
        list = swap((i % 2 === 0 ? 0 : c[i]) as number, i, list) as T[];
        out.push(list);
        c[i] += 1;
        i = 0;
        continue;
      }
      c[i] = 0;
    }

    return out as Slice<T>[];
  };
