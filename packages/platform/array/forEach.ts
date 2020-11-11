import {toCurried2Method} from "../../utils";
import {ForEach} from "./types";

/**
 * Functional `for each` for given functor (Array|Object|etc.).
 * @throws {Error} - When passed in functor doesn't have a `forEach` method.
 */
const forEach = toCurried2Method('forEach') as ForEach<any, any[]>;

export default forEach;
