import {swap} from "./utils";
import {repeat} from "./repeat";

/**
 * Returns a list of permutations for passed in list.
 *  Use caution with lists above a length of 15 (will take long due to nature of
 *  algorithm).
 */
export const permutations = <T>(xs: T[]): T[][] => {
  const limit = xs.length;

  if (!limit || limit === 1) return [xs];

  const c = repeat(limit, 0) as number[];
  let list: T[] = xs.slice(0),
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

  return out as T[][];
};
