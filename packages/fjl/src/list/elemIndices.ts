import {findIndices} from "./findIndices";
import {Unary} from "../types";
import {$equal} from "../boolean/equal";

/**
 * Returns found "value" indices.
 */
export const elemIndices = (value, xs): number[] => findIndices($equal(value) as Unary, xs),

  $elemIndices = value =>
    (xs): number[] => elemIndices(value, xs)
;
