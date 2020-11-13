import { curry } from "../function/curry";
import { length } from "../platform/object";
import { sliceCopy } from "./utils/sliceCopy";
import { $takeWhile } from "./takeWhile";
import { $slice } from "../platform/slice";
export const $groupBy = (equalityOp, xs) => {
    const limit = length(xs);
    if (!limit) {
        return [sliceCopy(xs)];
    }
    let ind = 0, prevItem, item;
    const _xs = (!xs.push ? Array.from(xs) : xs), predOp = (x) => {
        if (equalityOp(x, prevItem)) {
            ind++;
        }
        if (equalityOp(x, item)) {
            prevItem = x;
            return true;
        }
        return false;
    }, agg = [];
    for (; ind < limit; ind += 1) {
        item = xs[ind];
        agg.push($takeWhile(predOp, $slice(ind, limit, _xs)));
    }
    return agg;
}, 
/**
 * Allows you to group items in a list based on your supplied equality check.
 * @note Sames `group` but allows you to specify equality operation.
 * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
 * @function module:list.groupBy
 * @param equalityOp {Function}
 * @param xs {Array}
 * @returns {*}
 */
groupBy = curry($groupBy);
//# sourceMappingURL=groupBy.js.map