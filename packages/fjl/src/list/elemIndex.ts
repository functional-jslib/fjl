import {curry, CurryOf2} from "../function/curry";
import {indexOf, Slice} from "../platform/slice";

type ElemIndex<T> = CurryOf2<T, Slice<T>, number | undefined>;

export const
    /**
     * @function module:list.elemIndex
     * @param xs {Array} - list or list like.
     * @param x {*} - Element to search for.
     * @returns {*}
     */
    elemIndex = curry(<T>(xs: Slice<T>, x: T): number | undefined => {
        const foundInd = indexOf(xs, x) as number;
        return foundInd !== -1 ? foundInd : undefined;
    }) as ElemIndex<any>;

