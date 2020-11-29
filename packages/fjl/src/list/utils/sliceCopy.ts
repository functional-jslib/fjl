import {SliceOf} from "../../platform/slice";
import {$sliceFrom} from "./sliceFrom";

export const

    /**
     * Slices a copy of list.
     * @function list/utils.sliceCopy
     * @param xs {SliceOf<any>}
     * @returns {SliceOf<any>}
     * @generic
     */
    sliceCopy = <T>(xs: SliceOf<T>): SliceOf<T> => $sliceFrom(0, xs)

;
