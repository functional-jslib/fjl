import { curry2 } from '../function/curry';
import { reduce } from "./utils/reduce";
import { append } from "./append";
import { difference } from "./difference";
export const 
/**
 * Returns the complement of list 0 and the reset of the passed in arrays.
 * @function module:list._complement
 * @param arr0 {Array}
 * @param arrays {...Array}
 * @returns {Array}
 */
_complement = (arr0, ...arrays) => reduce((agg, arr) => append(agg, difference(arr, arr0)), [], arrays), 
/**
 * Returns the complement of list 0 and the reset of the passed in arrays.
 * @function module:list.complement
 * @param arr0 {Array}
 * @param arrays {...Array}
 * @returns {Array}
 * @curried
 */
complement = curry2(_complement);
//# sourceMappingURL=complement.js.map