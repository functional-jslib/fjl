import { toCurried2Method } from "../../utils/method-proxies";
import { curry2 } from "../../function";
/**
 * Functional `includes` method (same as `(#Array|#String).includes`
 * except takes the instance functor (string/array/etc.) as the second argument.
 * @function module:list.includes
 * @param searchStr {SliceOf<any>|*}
 * @param slice {SliceOf<any>} - Array, string or any other `Slice` like.
 * @param [fromIndex=0] {number}
 * @returns {Boolean}
 */
const includes = (() => ('includes' in Array.prototype ?
    toCurried2Method('includes') :
    curry2((searchValue, slice, fromIndex = 0) => slice.indexOf(searchValue, fromIndex) > -1)))();
export default includes;
//# sourceMappingURL=includes.js.map