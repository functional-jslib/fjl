import {curry, CurryOf2} from "../function";
import {concat} from "./concat";
import {map} from "./map";
import {MapOp} from "../platform";
import {Indexable} from "../types";

export type ConcatMap<T, RetT, Mapper, Functor, RetFunctor> =
  CurryOf2<Mapper, Functor, RetT>

export const

  /**
   * Map a function over all the elements of a container and concatenate the resulting lists.
   */
  concatMap = <T, RetT>(
    fn: MapOp<T, Indexable<T>, RetT>,
    indexable: Indexable<T>
  ): Indexable<T> =>
    concat(map(fn, indexable)),

  $concatMap = curry(concatMap) as ConcatMap<any, any, MapOp<any, Indexable, any>, Indexable, any>

;
