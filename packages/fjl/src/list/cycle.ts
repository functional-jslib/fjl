import {concat} from "./concat";
import {replicate} from "./replicate";
import {genIterator} from "./iterate";

export const

  /**
   * Replicates a list *n* number of times and appends the results (concat)
   */
  cycle = <T>(n: number, xs: T[]): T[] =>
    concat(replicate(n, xs) as T[][]),

  $cycle = <T>(n: number) =>
    (xs: T[]): T[] => cycle(n, xs),

  /**
   * Generates a generator which cycles list (concatenate) to end of last yielded result - On first call last yielded
   * result is initial list.
   */
  genCycler = <T>(xs: T[]): Generator<T[], void, T[]> =>
    genIterator(_xs => _xs.concat(xs), xs)();
