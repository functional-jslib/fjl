/**
 * @memberOf functionOps
 */

/**
 * Negates a predicate function.
 * @function module:functionOps.negateP
 * @param fn {Function}
 * @returns {Function} - Negated predicate
 */
export const negateP = fn => (x, ind, xs) => !fn(x, ind, xs);
