import {curry} from '../function/curry';

export const

    /**
     * Equality operator.
     * @function module:boolean.equal
     * @param a {*}
     * @param b {*}
     * @returns {boolean}
     */
    equal = curry((a, b) => a === b);
