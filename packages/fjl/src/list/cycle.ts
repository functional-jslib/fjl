import {curry} from "../function";
import {concat} from "./concat";
import {replicate} from "./replicate";
import {Slice} from "../types/native";

export const

  /**
   * Replicates a list `limit` number of times and appends the results (concat)
   */
  cycle = <T>(n: number, xs: Slice<T>): Slice<T[]> =>
    concat(replicate(n, xs) as Slice<T[]>[]),

  $cycle = curry(cycle);
