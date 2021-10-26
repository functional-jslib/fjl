/**
 * Equality combinator.
 */ import {curry2, CurryOf2} from "../function";

export const equal = <T = any>(a: T, b: T): boolean => a === b,

  $equal = curry2(equal) as CurryOf2;
