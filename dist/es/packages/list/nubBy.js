import { curry } from "../function/curry";
import { length } from "../platform/object";
import { any } from "./any";
export const 
/**
 * The nubBy function behaves just like nub, except it uses a user-supplied equality predicate.
 * @function module:list.nubBy
 * @param pred {Function}
 * @param list {Array|String|*}
 * @returns {Array}
 */
nubBy = curry((pred, list) => {
    if (!length(list)) {
        return [];
    }
    const limit = length(list);
    let ind = 0, currItem, out = [], anyOp = storedItem => pred(currItem, storedItem);
    for (; ind < limit; ind += 1) {
        currItem = list[ind];
        if (any(anyOp, out)) {
            continue;
        }
        out.push(currItem);
    }
    return out;
});
//# sourceMappingURL=nubBy.js.map