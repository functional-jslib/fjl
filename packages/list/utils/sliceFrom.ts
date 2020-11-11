import {curry, CurryOf2} from "../../function/curry";
import {$slice, SliceOf} from "../../platform/slice";

export const

    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @function module:listUtils.$sliceFrom
     * @param startInd {Number}
     * @param xs {SliceOf<any>>}
     * @returns {SliceOf<any>}
     * @generic
     */
    $sliceFrom = <T>(startInd: number, xs: SliceOf<T>): SliceOf<T> =>
        $slice(startInd, undefined, xs) as SliceOf<T>,

    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @function module:listUtils.sliceFrom
     * @param startInd {Number}
     * @param xs {SliceOf<any>}
     * @returns {SliceOf<any>}
     * @curried
     * @generic
     */
    sliceFrom = curry($sliceFrom) as CurryOf2<number, SliceOf<any>, SliceOf<any>>
;
