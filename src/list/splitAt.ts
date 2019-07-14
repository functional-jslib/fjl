import {sliceFrom, sliceTo} from "./utils";

export const
    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned list)).
     * @function module:list.splitAt
     * @param ind {Number} - Index to split at.
     * @param list {Array|String} - functor (list or string) to split.
     * @returns {Array|String} - ListLike like type passed
     */
    splitAt = (ind, list) => [sliceTo(ind, list), sliceFrom(ind, list)];
