import {concat} from "../platform/slice";
import {map} from "./map";
import {MapOp, ArrayType} from "../types";

export const

  /**
   * Map a function over all the elements of a container and concatenate the resulting lists.
   */
  concatMap = <T, TS extends T[], RetT, RetTS extends RetT[]>(
    fn: MapOp<T, number, TS[], RetT>,
    arr: TS[]
  ): RetTS =>
    concat(map(fn, arr)) as RetTS,

  $concatMap = <T, TS extends T[], RetT, RetTS extends RetT[]>
  (fn: MapOp<T, number, TS[], RetT>) =>
    (arr: TS[]): RetTS => concatMap(fn, arr)

;
