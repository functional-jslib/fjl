import {curry2, CurryPred2} from '../function/curry';

/**
 * Equality combinator.
 */
export const

  equal = <T>(a: T, b: T): boolean => a === b,

  $equal = curry2(equal) as CurryPred2<any>;
