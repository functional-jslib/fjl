import {lastIndex} from './utils';
import {Slice} from "../types";

/**
 * Returns last item of list.
 */
export const last = <T>(xs: Slice<T>): T | undefined => xs[lastIndex(xs)];
