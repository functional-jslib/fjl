import {curry2, CurryOf2} from "../../function/curry";
import {SliceOf, SlicePred} from "../../platform/slice/types";
import {length} from "../../platform/object";

export const

    /**
     * @function module:listUtils.$findIndicesWhere
     * @param pred {Function}
     * @param xs {SliceOf<any>} - list or list like.
     * @returns {Array|undefined}
     */
    $findIndicesWhere = <T>(pred, xs: SliceOf<T>): number[] | undefined => {
        const limit = length(xs);
        let ind = 0;
        const out: any[] = [];
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
    findIndicesWhere = curry2($findIndicesWhere) as CurryOf2<SlicePred<any>, SliceOf<any>, number[] | undefined>

;
