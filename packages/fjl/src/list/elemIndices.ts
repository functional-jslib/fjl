import {findIndices} from "./findIndices";
import {$equal} from "../boolean/equal";

/**
 * Returns found "value" indices.
 */
export const elemIndices = (value, xs): number[] =>
    findIndices($equal(value), xs),

  $elemIndices = value =>
    (xs): number[] =>
      elemIndices(value, xs)
;
