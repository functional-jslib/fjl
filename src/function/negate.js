/**
 * @memberOf function
 */

import {apply} from '../jsPlatform/function';
import {curry} from './curry';

export const

    /**
     * Takes a function that takes two parameters and returns a negated version of given
     * function.
     * @function module:_negate.negateF
     * @param fn {Function}
     * @returns {Function}
     */
    negateF = fn => curry((a, b) => !fn(a, b)),

    /**
     * Takes a function that takes three parameters and returns a
     * negated version of given function.
     * @function module:_negate.negateF3
     * @param fn {Function}
     * @returns {Function}
     */
    negateF3 = fn => curry((a, b, c) => !fn(a, b, c)),

    /**
     * Takes a function that takes four parameters and returns a
     * negated version of given function.
     * @function module:_negate.negateF4
     * @param fn {Function}
     * @returns {Function}
     */
    negateF4 = fn => curry((a, b, c, d) => !fn(a, b, c, d)),

    /**
     * Takes a function that takes four parameters and returns a
     * negated version of given function.
     * @function module:_negate.negateF5
     * @param fn {Function}
     * @returns {Function}
     */
    negateF5 = fn => curry((a, b, c, d, e) => !fn(a, b, c, d, e)),

    /**
     * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
     * @function module:function.negateP
     * @param fn {Function}
     * @returns {Function}
     */
    negateP = negateF3,

    /**
     * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
     * The return function is variadic (or accepts one or more arguments (and isn't curried)).
     * @function module:function.negateFMany
     * @param fn {Function}
     * @returns {Function}
     */
    negateFMany = fn => (...args) => !apply(fn, args);
