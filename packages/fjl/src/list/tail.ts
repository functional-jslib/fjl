/**
 * Returns tail part of list (everything after the first item as new list).
 * @haskelType `tail :: [a] -> [a]`
 * @function module:list.tail
 * @param xs {Array|String}
 * @returns {Array|String}
 */
import {Slice} from "../types";

export const tail = <T extends Slice>(xs: T): T => xs.slice(1) as typeof xs;
