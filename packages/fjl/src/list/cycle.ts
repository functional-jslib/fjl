import {curry} from "../function";
import {concat} from "./concat";
import {replicate} from "./replicate";
import {Slice} from "../platform/slice";

/**
 * Replicates a list `limit` number of times and appends the results (concat)
 * @function module:list.cycle
 * @param n {Number}
 * @param xs {Array}
 * @returns {Array}
 */
export const cycle = curry(
    <T>(n: number, xs: Slice<T>): Slice<T[]> =>
        concat(replicate(n, xs) as Slice<T[]>[])
);
