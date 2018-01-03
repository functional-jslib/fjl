/**
 * @memberOf _functionOps
 */

import {apply} from '../_jsPlatform/function_';

import {reverse} from '../_jsPlatform/array_';

export const

    negateF = fn => (a, b) => !fn(a, b),

    negateF3 = fn => (a, b, c) => !fn(a, b, c),

    negateF4 = fn => (a, b, c, d) => !fn(a, b, c, d),

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
    negateFMany = fn => (...args) => !apply(fn, reverse(args));