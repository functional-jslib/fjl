import {curry, CurryOf2} from "../function/curry";
import {indexOf, SliceOf} from "../platform/slice";

type ElemIndex<T> = CurryOf2<T, SliceOf<T>, number | undefined>;

export const
    /**
     * @function module:list.elemIndex
     * @param xs {Array} - list or list like.
     * @param x {*} - Element to search for.
     * @returns {*}
     */
    elemIndex = curry(<T>(xs: SliceOf<T>, x: T): number | undefined => {
        const foundInd = indexOf(xs, x) as number;
        return foundInd !== -1 ? foundInd : undefined;
    }) as ElemIndex<any>;

