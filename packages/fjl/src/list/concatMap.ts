import {curry, CurryOf2} from "../function";
import {concat} from "./concat";
import {map} from "./map";
import {MapOp, Indexable} from "../types";

export type ConcatMap<T, RetT, Mapper, Functor, RetFunctor> =
  CurryOf2<Mapper, Functor, RetT>

export const

  /**
   * Map a function over all the elements of a container and concatenate the resulting lists.
   */
  concatMap = <T, RetT>(
    fn: MapOp<T, number | string, Indexable<T>, RetT>,
    indexable: Indexable<T>
  ): Indexable<T> =>
    concat(map(fn, indexable)),

  $concatMap = curry(concatMap) as ConcatMap<any, any, MapOp<any, number | string, Indexable, any>, Indexable, any>

;
