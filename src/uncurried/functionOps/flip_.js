import {reverse} from '../jsPlatform/array_';
import {apply, call} from '../jsPlatform/function_';

export const

    /**
     * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
     * @function module:functionOps_.flipN
     * @param fn {Function}
     * @returns {Function}
     */
    flipN = fn => (...args) => apply(fn, reverse(args)),

    /**
     * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
     * @function module:functionOps_.flip
     * @param fn {Function}
     * @returns {Function}
     */
    flip = fn => (b, a) => call(fn, a, b);
