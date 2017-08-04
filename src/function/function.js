/**
 * Function operations: `
 * @module function
 */
import {reverse} from './../array/arrayPrelude';
import {call} from './call';
import {apply} from './apply';

export {compose} from './compose';

export {curry, curryN, curry2, curry3, curry4, curry5,
    __, curry_, curryN_, curry2_, curry3_, curry4_, curry5_} from './curry';

export {negate} from './negate';

export {call};

export {apply};

export const id = x => x,

    of = (x, ...args) => {

    },

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
     * Run `operation` until predicate returns `true`.
     * @param predicate {Function} :: a -> Boolean
     * @param operation {Function} :: a -> a
     * @param typeInstance {*} :: * - Same as a monoidal zero or some starting point
     * @returns {*} - What ever type `typeInstance` is
     */
    until = (predicate, operation, typeInstance) => {
        let result = typeInstance;
        while (!predicate(result)) {
            result = operation(result);
        }
        return result;
    };
