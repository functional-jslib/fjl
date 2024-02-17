import {concat} from "../_platform/slice";
import {map} from "./map";
import {MapOp, Slice} from "../types";

export const

  /**
   * Map a function over all the elements of a container of containers and concatenate the results.
   */
  concatMap = <T = any>(fn: MapOp, arr: Slice<T>[]): any[] =>
    concat(map(fn, arr)),

  $concatMap = <T = any>(fn: MapOp) =>
    (arr: T[][]): any[] =>
      concatMap(fn, arr)

;
