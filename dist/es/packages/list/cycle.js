import { curry } from "../function";
import { concat } from "./concat";
import { replicate } from "./replicate";
/**
 * Replicates a list `limit` number of times and appends the results (concat)
 * @function module:list.cycle
 * @param n {Number}
 * @param xs {Array}
 * @returns {Array}
 */
export const cycle = curry((n, xs) => concat(replicate(n, xs)));
//# sourceMappingURL=cycle.js.map