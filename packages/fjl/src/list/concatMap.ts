import {concat} from "./concat";
import {map} from "./map";
import {MapOp, Indexable} from "../types";

export const

  /**
   * Map a function over all the elements of a container and concatenate the resulting lists.
   */
  concatMap = <T, RetT>(
    fn: MapOp<T, number | string, Indexable<T>, RetT>,
    indexable: Indexable<T>
  ): Indexable<T> =>
    concat(map(fn, indexable)),

  $concatMap = <T, RetT>(fn: MapOp<T, number | string, Indexable<T>, RetT>) =>
    (indexable: Indexable<T>): Indexable<T> => concatMap(fn, indexable)

;
