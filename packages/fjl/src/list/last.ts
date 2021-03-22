import {lastIndex} from './utils';
import {Slice} from "../types";

/**
 * Returns last item of list.
 * @haskellType `last :: [a] -> a`
 * @function module:list.last
 * @param xs {Array|String}
 * @returns {*}
 */
export const last = <T>(xs: Slice<T>): T => xs[lastIndex(xs)] as T;
