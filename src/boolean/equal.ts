import {curry2} from '../function/curry';
import {BinaryPred} from "../types";

/**
 * Equality operator.
 * @function module:boolean.equal
 * @param [a=undefined] {any}
 * @param [b=undefined] {any}
 * @returns {boolean}
 */
const equal: BinaryPred<any> = curry2((a, b) => a === b) as BinaryPred<any>;

export default equal;
