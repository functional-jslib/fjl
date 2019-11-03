import {fPureTakesOne} from "../../utils";

/**
 * For each on functor (Array|Object|etc.).
 * @function module:jsPlatform.forEach
 * @param fn {Function}
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type of object you pass in unless it doesn't have a `forEach` method.
 * @throws {Error} - When passed in functor doesn't have a `forEach` method.
 */
const forEach = fPureTakesOne('forEach');

export default forEach;
