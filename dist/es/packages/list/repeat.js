import { curry } from "../function/curry";
import { iterate } from "./iterate";
/**
 * Repeats `x` `limit` number of times.
 * @function module:list.repeat
 * @param limit {number}
 * @param x {*}
 * @return {array}
 * @generic
 * @curried
 */
export const repeat = curry((n, x) => (n <= 0 ? [] : iterate(n, a => a, x)));
//# sourceMappingURL=repeat.js.map