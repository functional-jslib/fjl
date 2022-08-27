/**
 * Returns tail part of list (everything after the first item as new list).
 * @haskelType `tail :: [a] -> [a]`
 * @function module:list.tail
 * @param xs {Array}
 * @returns {Array}
 */

export const tail = xs => xs.slice(1);
