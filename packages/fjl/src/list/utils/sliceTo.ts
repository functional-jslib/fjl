import {curry, CurryOf2} from "../../function/curry";
import {$slice, Slice, SliceOf} from "../../platform/slice";

export const

    /**
     * Slices from index `0` to given index.
     * @function module:listUtils.$sliceTo
     * @param toInd {number}
     * @param xs {SliceOf<any>}
     * @returns {SliceOf<any>}
     * @generic
     */
    $sliceTo = <T>(toInd: number, xs: Slice<T>): Slice<T> =>
        $slice(0, toInd, xs) as Slice<T>,

    /**
     * Slices from index `0` to given index.
     * @function module:listUtils.sliceTo
     * @param toInd {number}
     * @param xs {SliceOf<any>}
     * @returns {SliceOf<any>}
     * @curried
     * @generic
     */
    sliceTo = curry($sliceTo) as CurryOf2<number, SliceOf<any>, SliceOf<any>>

;
