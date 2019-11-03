import {fPureTakesOne} from "../../utils";

/**
 * Returns `true` if `fn` (predicate) returns true for all items in functor else returns `false`.
 * @function module:jsPlatform.every
 * @param fn {Function} - Predicate.
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type passed.
 * @throws {Error} - When passed in object doesn't have an `every` method.
 */
const every = fPureTakesOne('every');

export default every;
