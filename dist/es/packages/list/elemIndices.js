import { curry } from "../function";
import { findIndices } from "./findIndices";
import equal from "../boolean/equal";
export const 
/**
 * Returns found "value" indices.
 * @function module:list.elemIndices
 * @param value {any} - Element to search for.
 * @param xs {SliceOf<any>} - list or list like.
 * @returns {undefined|number[]}
 */
elemIndices = curry((value, xs) => findIndices(equal(value), xs));
//# sourceMappingURL=elemIndices.js.map