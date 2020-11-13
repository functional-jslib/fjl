import { $sliceFrom } from "./utils/sliceFrom";
import { $sliceTo } from "./utils/sliceTo";
export const 
/**
 * Splits `x` in two at given `index` (exclusive (includes element/character at
 * given index in second part of returned list)).
 * @function module:list.splitAt
 * @param ind {number} - Index to split at.
 * @param list {SliceOf<any>>} - functor (list or string) to split.
 * @returns {[SliceOf<any>, SliceOf<any>]} - ListLike like type passed
 */
splitAt = (ind, list) => [$sliceTo(ind, list), $sliceFrom(ind, list)];
//# sourceMappingURL=splitAt.js.map