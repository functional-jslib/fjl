/**
 * Equality combinator.
 */
import {curry2, CurryOf2} from "../function";

export const equal = <T = any>(a: T, b: T): boolean => a === b;
export type Equal = typeof equal;
export type EqualParams = Parameters<Equal>;
export const $equal = curry2(equal) as CurryOf2<EqualParams[0], EqualParams[1], ReturnType<Equal>>;
