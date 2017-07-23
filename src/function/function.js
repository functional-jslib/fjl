/**
 * @module function
 */
import {reverse} from './../array/arrayPrelude';

export {apply} from './apply';
export {call} from './call';
export {compose} from './compose';
export {curry, curryN, curry2, curry3, curry4, curry5,
__, curry_, curryN_, curry2_, curry3_, curry4_, curry5_} from './curry';
export {negate} from './negate';

export const id = x => x,

    /**
     * Flips a functions arguments order and returns a new function requiring such (arguments in reverse order).
     * @function module:fnOperators.flipN
     * @param fn {Function}
     * @returns {Function}
     */
    flipN = fn => (...args) => apply(fn, reverse(args)),

    /**
     * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
     * @function module:fnOperators.flip
     * @param fn {Function}
     * @returns {Function}
     */
    flip = fn => (b, a) => call(fn, a, b),

    /**
     *
     * @param predicate {Function} :: a -> Boolean
     * @param operation {Function} :: a -> a
     * @param typeInstance {*} :: *
     * @returns {*} - What ever type instance type is
     */
    until = (predicate, operation, typeInstance) => {
        let result = typeInstance;
        while (predicate(result)) {
            result = operation(result);
        }
        return result;
    };
