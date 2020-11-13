import { curry } from "../../function/curry";
import length from "../../platform/object/length";
export const 
/**
 * Reduce right "until" func.
 * @function module:listUtils.$reduceUntilRight
 * @param pred {PredForSliceOf<any>}
 * @param op {ReduceOp<any, SliceOf<any>, any>}
 * @param agg {any}
 * @param arr {any[]}
 * @return {any}
 */
$reduceUntilRight = (pred, op, agg, arr) => {
    const limit = length(arr);
    if (!limit) {
        return agg;
    }
    let ind = limit - 1, result = agg;
    for (; ind >= 0; ind--) {
        if (pred(arr[ind], ind, arr)) {
            break;
        }
        result = op(result, arr[ind], ind, arr);
    }
    return result;
}, 
/**
 * Reduces until predicate is truthy (from right to left).
 * @function module:listUtils.reduceUntilRight
 * @param pred {Function} - `(item, index, list) => Boolean(...)`
 * @param op {Function} - Operation - `(agg, item, index, list) => agg`
 * @param agg {*} - Zero value.
 * @param xs {SliceOf<any>} - List/list-like.
 * @returns {*}
 * @curried
 */
reduceUntilRight = curry($reduceUntilRight);
//# sourceMappingURL=reduceUntilRight.js.map