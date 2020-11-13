import { curry } from "../../function/curry";
import length from "../../platform/object/length";
export const 
/**
 * Un-curried `reduceUntil` func.
 * @function module:listUtils.$reduceUntil
 * @param pred {PredForSliceOf<any>} - Predicate for slice of any.
 * @param op {ReduceOp<any, SliceOf<any> any>} - Reduce operation.
 * @param agg {any} - Aggregator.
 * @param xs {SliceOf<any>} - Slice of any.
 * @return {any}
 */
$reduceUntil = (pred, op, agg, xs) => {
    const limit = length(xs);
    if (!limit) {
        return agg;
    }
    let ind = 0, result = agg;
    for (; ind < limit; ind++) {
        if (pred(xs[ind], ind, xs)) {
            break;
        }
        result = op(result, xs[ind], ind, xs);
    }
    return result;
}, 
/**
 * Reduces until predicate.
 * @function module:listUtils.reduceUntil
 * @param pred {Function} - `(item, index, list) => Boolean(...)`
 * @param op {Function} - Operation - `(agg, item, index, list) => agg`
 * @param agg {*} - Zero value.
 * @param xs {SliceOf<any>} - ListLike.
 * @returns {*}
 * @curried Curried up to four params.
 */
reduceUntil = curry($reduceUntil);
//# sourceMappingURL=reduceUntil.js.map