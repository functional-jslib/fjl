import {concat} from "./concat";
import {replicate} from "./replicate";
import {Slice} from "../types";
import {genIterator} from "./iterate";
import {isType} from "../object";

export const

  /**
   * Replicates a list `limit` number of times and appends the results (concat)
   */
  cycle = <T>(n: number, xs: T[]): T[] =>
    concat(replicate(n, xs)),

  $cycle = <T>(n: number) =>
    (xs: T[]): T[] => cycle(n, xs),

  /**
   * Generates a generator which cycles list (concatenate) to end of last yielded result - On first call last yielded
   * result is initial list.
   */
  genCycler = <T>(xs: T[]): Generator<T[], void, T[]> =>
    genIterator(_xs => _xs.concat(xs), xs)();
