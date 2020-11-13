import { curry3 } from "../../function";
const 
/**
 * (Array|String).prototype.slice
 * @function module:list.slice
 * @returns {SliceOf<any>>}
 * @param start {number}
 * @param end {number}
 * @param xs {SliceOf<any>}
 * @genric
 */
$slice = (start, end, xs) => xs.slice(start, end), 
/**
 * (Array|String).prototype.slice
 * @function module:list.slice
 * @returns {SliceOf<any>>}
 * @param start {number}
 * @param end {number}
 * @param xs {SliceOf<any>}
 * @curried
 * @generic
 */
slice = curry3($slice);
export { $slice };
export default slice;
//# sourceMappingURL=slice.js.map