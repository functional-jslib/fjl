import {reduceRight} from '../list/utils/reduceRight';
import {Unary} from "../types";

/**
 * Composes a function that calls all passed in functions, from right to left, passing each function's return value to
 * the next function to the left.
 */
export const compose = <T>(...functions: Unary<T>[]): Unary<T> =>
  (arg0: T): T => reduceRight((value: T, fn: Unary<T>) => fn(value), arg0, functions);
