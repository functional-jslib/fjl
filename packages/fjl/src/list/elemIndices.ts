import {curry, CurryOf2} from "../function";
import {findIndices} from "./findIndices";
import {Slice, SlicePred} from "../platform/slice";
import {equal} from "../boolean/equal";

type ElemIndices<T> = CurryOf2<T, Slice<T>, T | undefined>

export const
    /**
     * Returns found "value" indices.
     * @function module:list.elemIndices
     * @param value {any} - Element to search for.
     * @param xs {Slice<any>} - list or list like.
     * @returns {undefined|number[]}
     */
    elemIndices = curry(<T>(value: T, xs: Slice<T>): T | any =>
        findIndices(equal(value) as SlicePred<T>, xs)) as ElemIndices<any>;
