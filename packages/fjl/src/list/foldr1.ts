import {curry, CurryOf2} from "../function/curry";
import {unconsr} from "./unconsr";
import {reduceRight} from "./utils/reduceRight";
import {ReduceOp} from "../platform/array";
import {Slice} from "../platform/slice";

export const

    $foldr1 = <T, T2>(op: ReduceOp<T, Slice<T>, T2>, xs: T[]): T2 => {
        const parts = unconsr(xs);
        return !parts ? [] : reduceRight(op, parts[1], parts[0]);
    },

    /**
     * A variant of `foldr` except that this one doesn't require the starting point/value.  The starting point/value will be pulled
     * out from a copy of the container.
     * @function module:list.foldr1
     * @param op {Function}
     * @param xs {Array}
     * @returns {*} - Whatever type is lastly returned from `op`.
     */
    foldr1 = curry($foldr1) as CurryOf2<ReduceOp<any, Slice<any>, any>, Slice<any>, any>

;
