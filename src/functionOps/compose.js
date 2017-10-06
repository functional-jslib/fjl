/**
 * @memberOf functionOps
 */
import {foldr} from '../listOps';

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the functionOps on the left of itself.
 * @function module:functionOps.compose
 * @type {Function}
 * @param args {...Function}
 * @returns {Function}
 */
export const compose = (...args) => arg0 => foldr((value, fn) => fn(value), arg0, args);
