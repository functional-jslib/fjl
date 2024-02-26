import {TernaryPred} from "../types";
import {instanceOf} from "../_platform";

export const

  /**
   * Drops elements, from start of iterable, fulfilling predicate, and returns
   * a list (string if iterable is a string) of the remaining items.
   */
  dropWhile = <T>(p: TernaryPred, xs: Iterable<T>): typeof xs | T[] => {
    let index = -1,
      thresholdReached = false;

    const out = [];

    for (const x of xs) {
      index++;
      const dropCurrent = p(x, index, xs);
      if (!thresholdReached && dropCurrent) continue;
      else if (!thresholdReached && !dropCurrent) thresholdReached = true;
      out.push(x);
    }

    return instanceOf(xs, String) ? (out.join("") as Iterable<T>) : out;
  },

  /**
   * Curried version of `dropWhile`.
   */
  $dropWhile = <T>(p: TernaryPred) =>
    (xs: Iterable<T>): typeof xs | T[] =>
      dropWhile(p, xs)

;
