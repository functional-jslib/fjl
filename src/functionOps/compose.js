import {reduceRight} from '../listOps/listOpsPrelude';

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the functionOps on the left of itself.
 * @functionOps module:fjl.compose
 * @type {Function}
 * @param args {...Function}
 * @returns {Function}
 */
export const compose = (...args) => arg0 => reduceRight((value, fn) => fn(value), arg0, args);
