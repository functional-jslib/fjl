import { curry2 } from "../../function/curry";
import length from "../../platform/object/length";
export const 
/**
 * @function module:listUtils.$findIndicesWhere
 * @param pred {Function}
 * @param xs {SliceOf<any>} - list or list like.
 * @returns {Array|undefined}
 */
$findIndicesWhere = (pred, xs) => {
    const limit = length(xs);
    let ind = 0;
    const out = [];
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            out.push(ind);
        }
    }
    return out.length ? out : undefined;
}, 
/**
 * @function module:listUtils.findIndicesWhere
 * @param pred {Function}
 * @param xs {SliceOf<any>} - list or list like.
 * @returuns {Array|undefined}
 * @curried At Upto two params.
 */
findIndicesWhere = curry2($findIndicesWhere);
//# sourceMappingURL=findIndicesWhere.js.map