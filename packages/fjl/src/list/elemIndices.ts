import {findIndices} from "./findIndices";
import {Slice, Unary} from "../types";
import {$equal} from "../boolean/equal";

/**
 * Returns found "value" indices.
 */
export const elemIndices = <T>(value: T, xs: Slice<T>): number[] => findIndices($equal(value) as Unary, xs),

  $elemIndices = <T>(value: T) =>
    (xs: Slice<T>): number[] => elemIndices(value, xs)
;
