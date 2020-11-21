import { curry2 } from "../function/curry";
/**
 * Functional `push`.  Takes a list and one or more elements
 * to push onto list.
 * @curried - Curried upto 2 params.
 * @function module:list.pushMany
 * @param list {Array}
 * @param items {...any}
 * @param {Array} - Original list with items pushed on to it.
 */
export const pushMany = curry2((list, ...items) => {
    list.push(...items);
    return list;
});
//# sourceMappingURL=pushMany.js.map