/**
 * @memberOf _functionOps
 */

import {apply} from '../_jsPlatform/_function';

export const

    /**
     * Takes a function that takes two parameters and returns a negated version of given
     * function.
     * @function module:_negate.negateF
     * @param fn {Function}
     * @returns {Function}
     */
    negateF = fn => (a, b) => !fn(a, b),

    /**
     * Takes a function that takes three parameters and returns a
     * negated version of given function.
     * @function module:_negate.negateF3
     * @param fn {Function}
     * @returns {Function}
     */
    negateF3 = fn => (a, b, c) => !fn(a, b, c),

    /**
     * Takes a function that takes four parameters and returns a
     * negated version of given function.
     * @function module:_negate.negateF4
     * @param fn {Function}
     * @returns {Function}
     */
    negateF4 = fn => (a, b, c, d) => !fn(a, b, c, d),

    /**
     * Takes a function that takes four parameters and returns a
     * negated version of given function.
     * @function module:_negate.negateF5
     * @param fn {Function}
     * @returns {Function}
     */
    negateF5 = fn => (a, b, c, d, e) => !fn(a, b, c, d, e),

    /**
     * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
     * @function module:_functionOps.negateP
     * @param fn {Function}
     * @returns {Function}
     */
    negateP = negateF3,

    /**
     * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
     * @function module:_functionOps.negateFMany
     * @param fn {Function}
     * @returns {Function}
     */
    negateFMany = fn => (...args) => !apply(fn, args);
