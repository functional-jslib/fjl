import {lastIndex} from './utils';
import {NumberIndexable} from "../types";

/**
 * Returns last item of list.
 */
export const last = <T, TS extends NumberIndexable<T>>(xs: TS): T | undefined => xs[lastIndex(xs)] as T;
