import {curry, CurryOf2} from "../function/curry";
import {indexOf, SliceOf} from "../platform/slice";

type ElemIndex<T> = CurryOf2<T, SliceOf<T>, number | undefined>;

export const
    /**
     * @function module:list.elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array} - list or list like.
     * @returns {*}
     */
    elemIndex = curry(<T>(x: T, xs: SliceOf<T>): number | undefined => {
        const foundInd = indexOf(x, xs) as number;
        return foundInd !== -1 ? foundInd : undefined;
    }) as ElemIndex<any>;

