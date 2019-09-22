import {curry2} from '../function/curry';
import {equal} from './equal';

export const
    /**
     * Equality operator for all.
     * @function module:boolean.equalAll
     * @param a {*} - Item `0`.
     * @param args {...*} - Others
     * @returns {boolean}
     */
    equalAll = curry2((a, ...args) => args.every(b => equal(a, b)));
