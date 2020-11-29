import {curry, CurryOf2} from "../function/curry";
import {uncons} from "./uncons";
import {reduce} from "./utils/reduce";
import {ReduceOp} from "../platform/array/types";
import {SliceOf} from "../platform/slice/types";

export const

    $fold1 = <T, T2>(op: ReduceOp<T, SliceOf<T>, T2>, xs: T[]): T2 => {
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
    foldl1 = curry($fold1) as CurryOf2<ReduceOp<any, SliceOf<any>, any>, SliceOf<any>, any>

;
