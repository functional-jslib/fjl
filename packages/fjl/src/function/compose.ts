import {reduceRight} from '../list/utils/reduceRight';
import {Unary} from "../types";

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the function on the left of itself.
 */
export const compose = <T, RetT = T>(...fns: Unary[]): Unary<T, RetT> =>
  (arg0: T): RetT => reduceRight((value: T, fn: Unary) => fn(value), arg0, fns);
