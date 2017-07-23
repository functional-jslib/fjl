import {reduceRight} from '../array/arrayPrelude';

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the function on the left of itself.
 * @function module:fjl.compose
 * @type {Function}
 * @param args {...Function}
 * @returns {Function}
 */
export const compose = (...args) => arg0 => reduceRight((value, fn) => fn(value), arg0, args);
