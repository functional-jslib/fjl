import {reverse} from '../jsPlatform/array';
import {apply, call} from '../jsPlatform/function';
import {curry, curry2} from './curry';

export const

    /**
     * Returns a curried function requiring given functions arguments in reverse
     * (returned function expects 2 or more variables (curried at 2 or more args)).
     * @function module:function.flipN
     * @param fn {Function}
     * @returns {Function}
     * @curried
     */
    flipN = fn => curry2((...args) => apply(fn, reverse(args))),

    /**
     * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
     * @function module:function.flip
     * @param fn {Function}
     * @returns {Function}
     */
    flip = fn => curry((b, a) => call(fn, a, b));
