import {curry, CurryOf2} from "../function/curry";
import {SliceOf, SlicePred} from "../platform/slice";

type Filter<T> = CurryOf2<SlicePred<T>, SliceOf<T>, T[]>;

export const

    /**
     * Filters a structure of elements using given predicate (`pred`) (same as `[].filter`).
     * @function module:list.filter
     * @param pred {Function}
     * @param xs {SliceOf<any>}
     * @returns {Array}
     * @todo Update this to return `SliceOf<any>`
     */
    filter = curry(<T>(pred: SlicePred<T>, xs: SliceOf<T>): T[] => {
        let ind = 0;
        const limit = xs.length,
            out: any[] = [];
        if (!limit) {
            return out;
        }
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out.push(xs[ind]);
            }
        }
        return out;
    }) as Filter<any>

;
