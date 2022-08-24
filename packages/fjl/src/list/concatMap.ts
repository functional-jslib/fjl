import {concat} from "./concat";
import {map} from "./map";
import {MapOp, Indexable, NumberIndexable, Slice, ConstructableType} from "../types";

export const

  /**
   * Map a function over all the elements of a container and concatenate the resulting lists.
   */
  concatMap = <T, ArrayType extends Slice<T>, RetT>(
    fn: MapOp<T, number, ArrayType[], RetT>,
    arr: ArrayType[]
  ): ArrayType =>
    concat(map(fn, arr)),

  $concatMap = <T, ArrayType extends Slice<T>, RetT>
  (fn: MapOp<T, number, ArrayType[], RetT>) =>
    (arr: ArrayType[]): ArrayType => concatMap(fn, arr)

;
