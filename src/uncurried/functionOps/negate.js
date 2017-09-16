/**
 * @module negate
 */

import {apply} from './apply';

import {reverse} from   '../jsPlatform/arrayOpsUncurried';

export const

    negateF = fn => (a, b) => !fn(a, b),

    negateF3 = fn => (a, b, c) => !fn(a, b, c),

    negateF4 = fn => (a, b, c, d) => !fn(a, b, c, d),

    negateF5 = fn => (a, b, c, d, e) => !fn(a, b, c, d, e),

    /**
     * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
     * @function module:functionOps.negateP
     * @param fn {Function}
     * @returns {Function} - Negated predicate
     */
    negateP = negateF3,

    /**
     * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
     * @function module:functionOpsUncurried.negateFMany
     * @param fn {Function}
     * @returns {Function<...args>}
     */
    negateFMany = fn => (...args) => !apply(fn, reverse(args));
