import {curry, CurryOf2} from "../function";
import {concat} from "./concat";
import {map} from "./map";
import {MapOp} from "../platform/array";
import {Slice} from "../platform/slice";
import {Foldable} from "../types";

export type ConcatMap<T, RetT, Mapper, Functor, RetFunctor> =
  CurryOf2<Mapper, Functor, RetT>

export const

  $concatMap = <T, RetT>(
    fn: MapOp<T, Foldable<T>, RetT>,
    foldable: Foldable<T>): Foldable<T> =>
    concat(map(fn, foldable)) as Foldable<T>
  ,

  /**
   * Map a function over all the elements of a container and concatenate the resulting lists.
   * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
   * @function module:list.concatMap
   * @param fn {Function} - Mapping function;  E.g., `(x, i, xs) => y`.
   * @param foldable {Array|String|*}
   * @returns {Array|String|*}
   */
  concatMap = curry($concatMap) as ConcatMap<any, any, MapOp<any, Slice<any>, any>, any[], any>

;
