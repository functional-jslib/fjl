import {curry, CurryOf2} from "../function";
import {concat} from "./concat";
import {map} from "./map";
import {MapOp} from "../jsPlatform/array";
import {SliceOf} from "../jsPlatform/slice";
import {Foldable} from "../types";

export type ConcatMap<T, RetT, Mapper, Functor, RetFunctor> =
    CurryOf2<Mapper, Functor, RetT>

export const
    /**
     * Map a function over all the elements of a container and concatenate the resulting lists.
     * @haskellType `concatMap :: Foldable t => (a -> [b]) -> t a -> [b]`
     * @function module:list.concatMap
     * @param fn {Function} - Mapping function;  E.g., `(x, i, xs) => y`.
     * @param foldable {Array|String|*}
     * @returns {Array|String|*}
     */
    concatMap = curry(<T, RetT>(
        fn: MapOp<T, Foldable<T>, RetT>,
        foldable: Foldable<T>): Foldable<T> =>
        concat(map(fn, foldable)) as Foldable<T>
    ) as ConcatMap<any, any, MapOp<any, SliceOf<any>, any>, any[], any>

;
