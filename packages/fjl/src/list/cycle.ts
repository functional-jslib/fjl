import {curry} from "../function";
import {concat} from "./concat";
import {replicate} from "./replicate";
import {Slice} from "../types";
import {genIterator} from "./iterate";
import {isType} from "../object";

export const

  /**
   * Replicates a list `limit` number of times and appends the results (concat)
   */
  cycle = <T>(n: number, xs: Slice<T>): Slice<T[]> =>
    concat(replicate(n, xs) as Slice<T[]>[]),

  $cycle = curry(cycle),

  /**
   * Generates a generator which cycles list (concatenate) to end of last yielded result - On first call last yielded
   * result is initial list.
   */
  genCycler = <T>(xs: Slice<T>): Generator<Slice<T>, void, Slice<T>> =>
    genIterator(_xs => _xs.concat(xs), xs)();
