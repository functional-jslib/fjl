import {lastIndex} from './utils';

/**
 * Returns last item of list.
 */
export const last = <T>(xs: T[]): T | undefined => xs[lastIndex(xs)];
