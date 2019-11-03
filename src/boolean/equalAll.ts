import {curry2} from '../function/curry';
import {equal} from './equal';
import {PolyPred} from "../types";

export const
    /**
     * Equality operator for all.
     * @curried - Curried at upto 2 args.
     * @function module:boolean.equalAll
     * @param a {*} - Item `0`.
     * @param args {...*} - Others
     * @returns {boolean}
     */
    equalAll: PolyPred<any> = curry2((a, ...args) =>
        args.every(b => equal(a, b))
    ) as PolyPred<any>;
