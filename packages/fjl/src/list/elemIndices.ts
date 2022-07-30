import {findIndices} from "./findIndices";
import {Indexable, Unary} from "../types";
import {$equal} from "../boolean/equal";

/**
 * Returns found "value" indices.
 */
export const elemIndices = <T = any>(value: T, xs: Indexable<T>): T | any => findIndices($equal(value) as Unary, xs),

  $elemIndices = <T = any>(value: T) =>
    (xs: Indexable<T>): T | any => elemIndices(value, xs)
;
