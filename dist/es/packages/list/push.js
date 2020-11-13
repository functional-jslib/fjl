import { curry2 } from "../function/curry";
/**
 * Functional `push` - binary version.  Takes a list and an element to push onto list.  Returns list.
 * @curried - Curried upto `2` items - (takes 2 or more before firing off).
 * @function module:list.push
 * @param list {Array}
 * @param x {any}
 * @returns {Array} - Original list with item pushed onto it.
 */
export const push = curry2((list, x) => {
    list.push(x);
    return list;
});
//# sourceMappingURL=push.js.map