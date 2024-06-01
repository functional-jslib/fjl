import {concat} from "../_platform/slice";
import {map} from "./map";
import type {Ternary} from "../types";

export const

  /**
   * Map a function over all the elements of a container of containers and concatenate the results.
   */
  concatMap = <T=any, TS extends any[]=any[]>(
    fn: Ternary<T, number, TS[]>,
    arr: TS[]
  ): ReturnType<typeof fn>[] =>
    concat(map(fn, arr)),

  /**
   * Curried version of `concatMap`.
   */
  $concatMap = <T=any, TS extends any[]=any[]>(
    fn: Ternary<T, number, TS[]>
  ) =>
    (arr: TS[]): ReturnType<typeof fn>[] =>
      concatMap(fn, arr)

;
