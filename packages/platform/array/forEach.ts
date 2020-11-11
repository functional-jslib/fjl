import {toCurried2Method} from "../../utils";
import {ForEach} from "./types";

/**
 * Functional `for each` for given functor (Array|Object|etc.).
 * @function module:platform.forEach
 * @param fn {Function}
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type of object you pass in unless it doesn't have a `forEach` method.
 * @throws {Error} - When passed in functor doesn't have a `forEach` method.
 */
const forEach = toCurried2Method('forEach') as ForEach<any, any[]>;

export default forEach;
