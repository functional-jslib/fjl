import { curry } from "../function/curry";
import { zipN } from "./zipN";
export const 
/**
 * @haskellType `zip5 :: [a] -> [b] -> [c] -> [d] -> [e] -> [(a, b, c, d, e)]`
 * @function module:list.zip5
 * @param arr1 {Array}
 * @param arr2 {Array}
 * @param arr3 {Array}
 * @param arr4 {Array}
 * @param arr5 {Array}
 * @returns {Array<Array<*,*>>}
 */
zip5 = curry((arr1, arr2, arr3, arr4, arr5) => zipN(arr1, arr2, arr3, arr4, arr5));
//# sourceMappingURL=zip5.js.map