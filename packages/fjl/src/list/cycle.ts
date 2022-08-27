import {concat} from "./concat";
import {replicate} from "./replicate";
import {genIterator} from "./iterate";
import {Slice} from "../types";
import {append} from "./append";

export const

  /**
   * Replicates a list *n* number of times and appends the results (concat)
   */
  cycle = <T>(n: number, xs: Slice<T>): Slice<T> =>
    concat(replicate(n, xs)),

  $cycle = <T>(n: number) =>
    (xs: Slice<T>): Slice<T> => cycle(n, xs),

  /**
   * Generates a generator which cycles list (concatenate) to end of last yielded result - On first call last yielded
   * result is initial list.
   */
  genCycler = <T>(xs: Slice<T>): Generator<Slice<T>, void, Slice<T>> =>
    genIterator(_xs => append(_xs, xs), xs)();
