/**
 * Returns tail part of list (everything after the first item as new list).
 * @haskelType `tail :: [a] -> [a]`
 * @function module:list.tail
 * @param xs {Array|String}
 * @returns {Array|String}
 */
import {Slice} from "../types";

export const tail = <T>(xs: Slice<T>): Slice<T> => xs.slice(1);
