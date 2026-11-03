import {findIndices} from "./findIndices";
import {$equal} from "../boolean/equal";
import {NumberIndexable} from "../types";

/**
 * Returns found "value" indices.
 */
export const elemIndices = <T>(value: T, xs: NumberIndexable<T>): number[] =>
    findIndices($equal(value), xs),

  $elemIndices = <T>(value: T) =>
    (xs: NumberIndexable<T>): number[] =>
      elemIndices(value, xs)
;
