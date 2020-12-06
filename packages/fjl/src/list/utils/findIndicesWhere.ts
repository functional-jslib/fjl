import {curry2, CurryOf2} from "../../function/curry";
import {SliceOf, SlicePred} from "../../platform/slice/types";
import {length} from "../../platform/object";
import {PredForSliceOf} from "../types";

export const

    /**
     * Finds indices by predicate.
     */
    $findIndicesWhere = <T>(pred: PredForSliceOf<T>, xs: SliceOf<T>): number[] | undefined => {
        const limit = length(xs);
        let ind = 0;
        const out: any[] = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind] as T, ind, xs)) {
                out.push(ind);
            }
        }
        return out.length ? out : undefined;
    },

    /**
     * @curried At Upto two params.
     */
    findIndicesWhere = curry2($findIndicesWhere) as CurryOf2<SlicePred<any>, SliceOf<any>, number[] | undefined>

;
