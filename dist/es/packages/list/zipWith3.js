import { curry } from "../function/curry";
import { zipWithN } from "./zipWithN";
export const 
/**
 * Zips 3 lists with tupling function.
 * @haskellType `zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]`
 * @function module:list.zipWith3
 * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
 *  of said parts:
 *  E.g., ` op :: a -> b -> c -> (a, b, c)`
 * @param xs1 {Array}
 * @param xs2 {Array}
 * @param xs3 {Array}
 * @returns {Array<Array<*,*>>}
 */
zipWith3 = curry((op, xs1, xs2, xs3) => zipWithN(op, xs1, xs2, xs3));
//# sourceMappingURL=zipWith3.js.map