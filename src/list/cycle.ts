import {curry} from "../function/curry";
import {concat} from "./concat";
import {replicate} from "./replicate";

/**
 * Replicates a list `limit` number of times and appends the results (concat)
 * @function module:list.cycle
 * @param limit {Number}
 * @param xs {Array}
 * @returns {Array}
 */
export const cycle = curry((limit, xs) => concat(replicate(limit, xs)));
