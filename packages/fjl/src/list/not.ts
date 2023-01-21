import {all} from "./all";
import {isFalsy} from "../boolean";
import {NumberIndexable} from "../types";

/**
 * Returns a boolean indicating whether all items in passed in
 * container are 'falsy' or not.
 */
export const not = <T>(xs: NumberIndexable<T>): boolean =>
  all(isFalsy, xs);
