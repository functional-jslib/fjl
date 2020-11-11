import {curry2, CurryPred2} from '../function/curry';
import {BinaryPred} from "../types";

/**
 * Equality operator.
 * @function module:boolean.equal
 * @param [a=undefined] {any}
 * @param [b=undefined] {any}
 * @returns {boolean}
 */
const equal = curry2(<T>(a: T, b: T): boolean => a === b) as CurryPred2<any>;

export default equal;
