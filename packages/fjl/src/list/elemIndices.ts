import {curry, CurryOf2} from "../function";
import {findIndices} from "./findIndices";
import {SliceOf, SlicePred} from "../platform/slice";
import equal from "../boolean/equal";

type ElemIndices<T> = CurryOf2<T, SliceOf<T>, T | undefined>

export const
    /**
     * Returns found "value" indices.
     * @function module:list.elemIndices
     * @param value {any} - Element to search for.
     * @param xs {SliceOf<any>} - list or list like.
     * @returns {undefined|number[]}
     */
    elemIndices = curry(<T>(value: T, xs: SliceOf<T>): T | any =>
        findIndices(equal(value) as SlicePred<T>, xs)) as ElemIndices<any>;
