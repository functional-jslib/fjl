import {swap} from "./utils";
import {isEven} from "../number";

/**
 * Returns a list of permutations for passed in list.
 *  Use caution with lists above a length of 15 (will take long due to nature of
 *  algorithm).
 */
export const permutations = <T>(xs: T[]): T[][] => {
  const limit = xs.length;

  if (!limit || limit === 1) return [xs];

  const c = Array(limit).fill(0, 0, limit);
  let list: T[] = xs.slice(0),
    i = 0

  const out = [list] as T[][];

  while (i < limit) {
    if (c[i] < i) {
      // `(i & 1) === 0` checks if `i` is even or not
      list = swap((isEven(i) ? 0 : c[i]), i, list);
      out.push(list);
      c[i] += 1;
      i = 0;
      continue;
    }
    c[i] = 0;
    i += 1;
  }

  return out;
};
