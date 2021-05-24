import {curry, CurryOf2} from "../function";
import {findIndices} from "./findIndices";
import {Slice, SlicePred} from "../types/data";
import {$equal} from "../boolean/equal";

type ElemIndices<T> = CurryOf2<T, Slice<T>, T | undefined>

export const

  elemIndices = <T>(value: T, xs: Slice<T>): T | any =>
    findIndices($equal(value) as SlicePred<T>, xs),

  /**
   * Returns found "value" indices.
   */
  $elemIndices = curry(elemIndices) as ElemIndices<any>;
