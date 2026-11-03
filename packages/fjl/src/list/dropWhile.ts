import {TernaryPred} from "../types";

export const

  /**
   * Drops elements, from start of iterable, fulfilling predicate, and returns
   * a list (string if iterable is a string) of the remaining items.
   */
  dropWhile = <T>(p: TernaryPred<T, number, Iterable<T>>, xs: Iterable<T>): T[] => {
    let index = -1,
      thresholdReached = false;

    const out: T[] = [];

    for (const x of xs) {
      index++;
      const dropCurrent = p(x, index, xs);
      if (!thresholdReached && dropCurrent) continue;
      else if (!thresholdReached && !dropCurrent) thresholdReached = true;
      out.push(x);
    }

    return out;
  },

  /**
   * Curried version of `dropWhile`.
   */
  $dropWhile = <T>(p: TernaryPred<T, number, Iterable<T>>) =>
    (xs: Iterable<T>): T[] => dropWhile(p, xs)

;
