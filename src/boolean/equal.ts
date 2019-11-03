import {curry} from '../function/curry';
import {BinaryPred} from "../types";

export const

    /**
     * Equality operator.
     * @function module:boolean.equal
     * @param [a=undefined] {any}
     * @param [b=undefined] {any}
     * @returns {boolean}
     */
    equal: BinaryPred<any> = curry((a, b) => a === b) as BinaryPred<any>;
