import {curry2, CurryPred2} from '../function/curry';

/**
 * Equality combinator.
 */
const equal = curry2(<T>(a: T, b: T): boolean => a === b) as CurryPred2<any>;

export default equal;
