import {sliceFrom} from './utils';

/**
 * Returns tail part of list (everything after the first item as new list).
 * @haskelType `tail :: [a] -> [a]`
 * @function module:list.tail
 * @param xs {Array|String}
 * @returns {Array|String}
 */
export const tail = xs => sliceFrom(1, xs);
