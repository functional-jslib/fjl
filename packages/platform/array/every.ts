import {toCurried2Method} from "../../utils";
import {Every} from "./types";

/**
 * Functional every method. Returns true if predicate is true for every item
 *  in given array and false otherwise.
 * @throws {Error} - When passed in object doesn't have an `every` method.
 */
const every = toCurried2Method('every') as Every<any, any[]>;

export default every;
