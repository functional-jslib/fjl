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
    flip = fn => curry((b, a) => call(fn, a, b)),

    /**
     * Same as `flip` except returns a flipped function of arity 3.
     * @function module:function.flip3
     * @param fn {Function}
     * @returns {Function}
     */
    flip3 = fn => curry((c, b, a) => call(fn, a, b, c)),

    /**
     * Same as `flip` except returns a flipped function of arity 4.
     * @function module:function.flip4
     * @param fn {Function}
     * @returns {Function}
     */
    flip4 = fn => curry((d, c, b, a) => call(fn, a, b, c, d)),

    /**
     * Same as `flip` except returns a flipped function of arity 5.
     * @function module:function.flip5
     * @param fn {Function}
     * @returns {Function}
     */
    flip5 = fn => curry((e, d, c, b, a) => call(fn, a, b, c, d, e));
