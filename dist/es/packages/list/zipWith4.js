import { curry } from "../function/curry";
import { zipWithN } from "./zipWithN";
export const 
/**
 * Zips 4 lists with tupling function.
 * @haskellType `zipWith4 :: (a -> b -> c -> d -> e) -> [a] -> [b] -> [c]  -> [d] -> [e]`
 * @function module:list.zipWith4
 * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
 *  of said parts:
 *  E.g., ` op :: a -> b -> c -> d -> (a, b, c, d)`
 * @param xs1 {Array}
 * @param xs2 {Array}
 * @param xs3 {Array}
 * @param xs4 {Array}
 * @returns {Array<Array<*,*>>}
 */
zipWith4 = curry((op, xs1, xs2, xs3, xs4) => zipWithN(op, xs1, xs2, xs3, xs4));
//# sourceMappingURL=zipWith4.js.map