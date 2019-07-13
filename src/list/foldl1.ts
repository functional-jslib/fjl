import {curry} from "../function/curry";
import {uncons} from "./uncons";
import {reduce} from "./utils";

/**
 * A variant of `foldl` except that this one doesn't require the starting point.  The starting point/value will be pulled
 * out from a copy of the container.
 * @function module:list.foldl1
 * @param op {Function}
 * @param xs {Array}
 * @returns {*} - Whatever type is lastly returned from `op`.
 */
export const foldl1 = curry((op, xs) => {
    const parts = uncons(xs);
    return !parts ? [] : reduce(op, parts[0], parts[1]);
});
