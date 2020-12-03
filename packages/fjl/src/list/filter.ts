import {curry, CurryOf2} from "../function/curry";
import {SliceOf, SlicePred} from "../platform/slice";

type Filter<T> = CurryOf2<SlicePred<T>, SliceOf<T>, T[]>;

export const

    /**
     * Filters a structure of elements using given predicate (`pred`) (same as `[].filter`).
     */
    filter = curry(<T>(pred: SlicePred<T>, xs: SliceOf<T>): SliceOf<T> => {
        let ind = 0;
        const limit = xs.length,
            out: any[] = [];
        if (!limit) {
            return out;
        }
        for (; ind < limit; ind++) {
            if (pred(xs[ind] as T, ind, xs)) {
                out.push(xs[ind]);
            }
        }
        return out;
    }) as Filter<any>

;
