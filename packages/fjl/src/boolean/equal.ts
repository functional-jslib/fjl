import {curry2} from '../function/curry';

/**
 * Equality combinator.
 */
export const equal = <T = any>(a: T, b: T): boolean => a === b;

export type Equal = typeof equal;

export const $equal = curry2<Equal, Parameters<Equal>, ReturnType<Equal>>(equal);
