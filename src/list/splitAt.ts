import {$sliceFrom} from "./utils/sliceFrom";
import {$sliceTo} from "./utils/sliceTo";
import {SliceOf} from "../jsPlatform/slice";

export const
    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned list)).
     * @function module:list.splitAt
     * @param ind {number} - Index to split at.
     * @param list {SliceOf<any>>} - functor (list or string) to split.
     * @returns {[SliceOf<any>, SliceOf<any>]} - ListLike like type passed
     */
    splitAt = <T>(ind: number, list: SliceOf<T>): [SliceOf<T>, SliceOf<T>] =>
        [$sliceTo(ind, list), $sliceFrom(ind, list)];
