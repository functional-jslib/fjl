/**
 * @module negate
 */

/**
 * Negates a predicate function.
 * @param fn {Function}
 * @returns {Function} - Negated predicate
 */
export const negate = fn => (value, ind, arr) => !fn(value, ind, arr);
