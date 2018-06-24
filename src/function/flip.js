import {reverse} from '../jsPlatform/array';
import {apply, call} from '../jsPlatform/function';
import {curry, curry2} from './curry';

export const

    /**
     * Flips a functions arguments order and returns a new function requiring such (arguments in reverse order).
     * @function module:function.flipN
     * @param fn {Function}
     * @returns {Function}
     */
    flipN = fn => curry2((...args) => apply(fn, reverse(args))),

    /**
     * Returns a function that receives 3 args in reverse (3, 2, 1 etc.).
     * @function module:function.flip3
     * @param fn {Function} - Function<a, b, c>
     * @returns {Function} - Function<c, b, a>
     */
    flip3 = fn => curry((a, b, c) => call(fn, c, b, a)),

    /**
     * Returns a function that receives 4 args in reverse (4, 3, 2, 1 etc.).
     * @function module:function.flip4
     * @param fn {Function} - Function<a, b, c, d>
     * @returns {Function} - Function<d, c, b, a>
     */
    flip4 = fn => curry((a, b, c, d) => call(fn, d, c, b, a)),

    /**
     * Returns a function that receives 5 args in reverse (5, 4, 3, 2, 1 etc.).
     * @function module:function.flip5
     * @param fn {Function} - Function<a, b, c, d, e>
     * @returns {Function} - Function<e, d, c, b, a>
     */
    flip5 = fn => curry((a, b, c, d, e) => call(fn, e, d, c, b, a)),

    /**
     * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
     * @function module:function.flip
     * @param fn {Function}
     * @returns {Function}
     */
    flip = fn => curry((b, a) => call(fn, a, b));
