import {reduceRight} from '../list/utils/reduceRight';
import {Unary} from "../types";

/**
 * Composes all functions passed in from right to left passing each function's return value to
 * the function on the left of itself.
 */
export const compose = <T = any>(...fns: Unary<T>[]): Unary<T> =>
  (arg0: T): T => reduceRight((value: T, fn: Unary) => fn(value), arg0, fns);
