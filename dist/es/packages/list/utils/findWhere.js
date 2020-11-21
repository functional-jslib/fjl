import { curry } from "../../function/curry";
import length from "../../platform/object/length";
export const 
/**
 * Finds an item by predicate or returns `undefined`.
 * @function module:listUtils.$findWhere
 * @param pred {SlicePred<any>>}
 * @param xs {SliceOf<any>} - list or list like.
 * @returns {any}
 */
$findWhere = (pred, xs) => {
    let ind = 0;
    const limit = length(xs);
    if (!limit) {
        return;
    }
    for (; ind < limit; ind++) {
        const elm = xs[ind];
        if (pred(elm, ind, xs)) {
            return elm;
        }
    }
    return undefined;
}, 
/**
 * @function module:listUtils.findWhere
 * @param pred {SlicePred<any>>}
 * @param xs {SliceOf<any>} - list or list like.
 * @returns {any}
 * @curried At upto 2 params.
 */
findWhere = curry($findWhere);
//# sourceMappingURL=findWhere.js.map