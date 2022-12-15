import {concat} from "./concat";
import {replicate} from "./replicate";
import {genIterator} from "./iterate";
import {append} from "./append";

export const

  /**
   * Replicates a list *n* number of times and appends the results (concat)
   */
  cycle = (n: number, xs): typeof xs =>
    concat(replicate(n, xs)),

  $cycle = (n: number) => xs => cycle(n, xs),

  /**
   * Generates a generator which cycles list (concatenate) to end of last yielded result - On first call last yielded
   * result is initial list.
   */
  genCycler = (xs): Generator<typeof xs, void, typeof xs> =>
    genIterator(_xs => append(_xs, xs), xs)();
