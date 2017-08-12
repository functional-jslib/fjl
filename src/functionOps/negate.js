/**
 * @module negate
 */

/**
 * Negates a predicate function.
 * @param fn {Function}
 * @returns {Function} - Negated predicate
 */
export const negate = fn => (x, ind, xs) => !fn(x, ind, xs);
