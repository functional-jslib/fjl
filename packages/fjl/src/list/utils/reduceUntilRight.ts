import {curry, CurryOf4} from "../../function/curry";
import {length} from "../../platform/object";
import {PredForSliceOf} from "../types";
import {ReduceOp} from "../../platform/array/types";
import {SliceOf} from "../../platform/slice/types";

export type ReduceUntilRight<T, T2> = (p: PredForSliceOf<T>, op: ReduceOp<T, SliceOf<T>, T2>, agg: T2, xs: SliceOf<T>) => T2;

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
    $reduceUntilRight = <T, T2>(pred, op, agg: T2, arr: T[]): T2 => {
        const limit = length(arr);
        if (!limit) {
            return agg;
        }
        let ind = limit - 1,
            result = agg;
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
    reduceUntilRight = curry($reduceUntilRight) as
        CurryOf4<PredForSliceOf<any>, ReduceOp<any, SliceOf<any>, any>, any, SliceOf<any>, any>

;
