import {toCurried2Method} from "../../utils";
import {Every} from "./types";

/**
 * Functional every method. Returns true if predicate is true for every item
 *  in given array and false otherwise.
 * @function module:platform.every
 * @param fn {PredicateFunc<any, any[]>} - Predicate;  `(x, i, xs) => boolean`.
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type passed.
 * @throws {Error} - When passed in object doesn't have an `every` method.
 */
const every = toCurried2Method('every') as Every<any, any[]>;

export default every;
