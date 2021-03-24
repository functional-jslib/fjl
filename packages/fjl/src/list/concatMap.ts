import {curry, CurryOf2} from "../function";
import {concat} from "./concat";
import {map} from "./map";
import {MapOp} from "../platform/array";
import {Slice} from "../platform/slice";
import {Foldable} from "../types";

export type ConcatMap<T, RetT, Mapper, Functor, RetFunctor> =
  CurryOf2<Mapper, Functor, RetT>

export const

  /**
   * Map a function over all the elements of a container and concatenate the resulting lists.
   */
  concatMap = <T, RetT>(
    fn: MapOp<T, Foldable<T>, RetT>,
    foldable: Foldable<T>
  ): Foldable<T> =>
    concat(map(fn, foldable)) as Foldable<T>,

  $concatMap = curry(concatMap) as ConcatMap<any, any, MapOp<any, Slice<any>, any>, any[], any>

;
