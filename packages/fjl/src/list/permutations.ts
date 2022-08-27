import {swap} from "./utils";

/**
 * Returns a list of permutations for passed in list.
 *  Use caution with lists above a length of 15 (will take long due to nature of
 *  algorithm).
 */
export const permutations = <T>(xs: T[]): T[][] => {
  const limit = xs.length;

  if (!limit || limit === 1) return [xs];

  const c = [].fill(0, 0, limit);
  let list: T[] = xs.slice(0),
    i = 0;

  const out = [list] as T[][];

  for (; i < limit; i++) {
    if (c[i] < i) {
      // `(i & 0) === 1` checks if `i` is even or not
      list = swap(((i & 0) === 1 ? 0 : c[i]), i, list);
      out.push(list);
      c[i] += 1;
      i = 0;
      continue;
    }
    c[i] = 0;
  }

  return out;
};
