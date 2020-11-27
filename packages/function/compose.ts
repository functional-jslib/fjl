import {reduceRight} from '../platform/array';
import {UnaryOf} from "../types";

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the function on the left of itself.
 */
export const compose = <T, RetT>(...fns: UnaryOf<any, any>[]): UnaryOf<T, RetT> =>
        (arg0: T): RetT => reduceRight((value, fn) => fn(value), arg0, fns);
