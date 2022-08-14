import {concat} from "./concat";
import {replicate} from "./replicate";
import {Slice} from "../types";
import {genIterator} from "./iterate";
import {isType} from "../object";

export const

  /**
   * Replicates a list `limit` number of times and appends the results (concat)
   */
  cycle = <T, XS extends Slice<T>>(n: number, xs: XS): XS =>
    concat(replicate(n, xs)),

  $cycle = <T, XS extends Slice<T>>(n: number) =>
    (xs: XS): XS => cycle(n, xs),

  /**
   * Generates a generator which cycles list (concatenate) to end of last yielded result - On first call last yielded
   * result is initial list.
   */
  genCycler = <T>(xs: T[] | string): Generator<string | T[], void, string | T[]> =>
    genIterator(
      isType(String, xs) ?
        (_xs: string) => _xs.concat(xs as string) :
        (_xs: T[]) => _xs.concat(xs as T[]), xs)();
