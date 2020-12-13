import {$sliceFrom} from "./utils/sliceFrom";
import {$sliceTo} from "./utils/sliceTo";
import {Slice} from "../platform/slice";

export const
    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned list)).
     * @function module:list.splitAt
     * @param ind {number} - Index to split at.
     * @param list {Slice<any>>} - functor (list or string) to split.
     * @returns {[Slice<any>, Slice<any>]} - ListLike like type passed
     */
    splitAt = <T>(ind: number, list: Slice<T>): [Slice<T>, Slice<T>] =>
        [$sliceTo(ind, list), $sliceFrom(ind, list)];
