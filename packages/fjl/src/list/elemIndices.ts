import {findIndices} from "./findIndices";
import {NumberIndexable, Unary} from "../types";
import {$equal} from "../boolean/equal";

/**
 * Returns found "value" indices.
 */
export const elemIndices = <T = any>(value: T, xs: NumberIndexable<T>): T | any => findIndices($equal(value) as Unary, xs),

  $elemIndices = <T = any>(value: T) =>
    (xs: NumberIndexable<T>): T | any => elemIndices(value, xs)
;
