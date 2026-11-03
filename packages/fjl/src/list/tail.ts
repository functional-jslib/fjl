/**
 * Returns tail part of list (everything after the first item as new list).
 * @haskelType `tail :: [a] -> [a]`
 * @function module:list.tail
 * @param xs {Array}
 * @returns {Array}
 */

export const tail = <TS extends string | any[]>(xs: TS): TS => xs.slice(1) as TS;
