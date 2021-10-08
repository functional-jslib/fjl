import {curry} from "../function";
import {findIndices} from "./findIndices";
import {Indexable, Unary} from "../types";
import {$equal} from "../boolean/equal";

/**
 * Returns found "value" indices.
 */
export const elemIndices = <T = any>(value: T, xs: Indexable<T>): T | any => findIndices($equal(value) as Unary, xs),

  $elemIndices = curry(elemIndices);
