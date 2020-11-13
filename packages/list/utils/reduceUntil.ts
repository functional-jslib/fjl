import {curry, CurryOf4} from "../../function/curry";
import {PredForSliceOf} from "../types";
import {ReduceOp} from "../../platform/array/types";
import {SliceOf} from "../../platform/slice/types";
import {length} from "../../platform/object";

export type ReduceUntil<T1, T2> = CurryOf4<
    PredForSliceOf<T1>,
    ReduceOp<T1, SliceOf<T1>, T2>, // @todo Refactor `ReduceOp`
    T2, SliceOf<T1>, T2
    >;

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
    $reduceUntil = <T, T2>(pred: PredForSliceOf<T>, op: ReduceOp<T, SliceOf<T>, T2>, agg: T2, xs: T[]): T2 => {
        const limit = length(xs);
        if (!limit) {
            return agg;
        }
        let ind = 0,
            result = agg;
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
    reduceUntil = curry($reduceUntil) as ReduceUntil<any, any>

;
