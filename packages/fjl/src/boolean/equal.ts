import {curry2, CurryPred2} from '../function/curry';

/**
 * Equality combinator.
 * @todo consider making `equal` N-ary.
 */
const equal = curry2(<T>(a: T, b: T): boolean => a === b) as CurryPred2<any>;

export default equal;
