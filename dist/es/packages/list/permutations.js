import { length } from "../platform/object";
import { swapped } from "./utils";
import { sliceCopy } from "./utils/sliceCopy";
import { repeat } from "./repeat";
export const 
/**
 * Returns a list of permutations for passed in list.
 *  Use caution with lists above a length of 15 (will take long due to nature of
 *  algorithm).
 * @function module:list.permutations
 * @param xs {Array} - ListLike.
 * @returns {Array<Array|String|*>} - Array of permutations.
 */
permutations = (xs) => {
    const limit = length(xs);
    if (!limit || limit === 1) {
        return [xs];
    }
    const c = repeat(limit, 0);
    let list = sliceCopy(xs), i = 0;
    const out = [list];
    for (; i < limit; i++) {
        if (c[i] < i) {
            list = swapped(i % 2 === 0 ? 0 : c[i], i, list);
            out.push(list);
            c[i] += 1;
            i = 0;
            continue;
        }
        c[i] = 0;
    }
    return out;
};
//# sourceMappingURL=permutations.js.map