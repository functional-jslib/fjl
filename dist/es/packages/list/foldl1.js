import { curry } from "../function/curry";
import { uncons } from "./uncons";
import { reduce } from "./utils/reduce";
export const $fold1 = (op, xs) => {
    const parts = uncons(xs);
    return !parts ? [] : reduce(op, parts[0], parts[1]);
}, 
/**
 * A variant of `foldl` except that this one doesn't require the starting point.  The starting point/value will be pulled
 * out from a copy of the container.
 * @function module:list.foldl1
 * @param op {Function}
 * @param xs {Array}
 * @returns {*} - Whatever type is lastly returned from `op`.
 */
foldl1 = curry($fold1);
//# sourceMappingURL=foldl1.js.map