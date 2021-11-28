import {reduceRight} from '../list/utils/reduceRight';
import {Unary} from "../types";

/**
 * Composes all functions passed in from right to left passing each function's return value to
 * the function on the left of itself.
 */
export const compose = (...fns: Unary[]): Unary =>
  (arg0: any): any => reduceRight((value: any, fn: Unary) => fn(value), arg0, fns);
