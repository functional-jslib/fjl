import { sortBy } from "./sortBy";
import { genericAscOrdering } from "./utils";
export const 
/**
 * The sort function implements a stable sorting algorithm.
 * It is a special case of sortBy, which allows the programmer
 * to supply their own comparison function.
 * ```shallowCompare(sort ([1,6,4,3,2,5]), [1,2,3,4,5,6]) // true```
 * @function module:list.sort
 * @param xs {Array|String|*}
 * @returns {Array}
 */
sort = xs => sortBy(genericAscOrdering, xs);
//# sourceMappingURL=sort.js.map