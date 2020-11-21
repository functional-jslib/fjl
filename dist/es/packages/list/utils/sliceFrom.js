import { curry } from "../../function/curry";
import { $slice } from "../../platform/slice";
export const 
/**
 * Returns a slice of the given list from `startInd` to the end of the list.
 * @function module:listUtils.$sliceFrom
 * @param startInd {Number}
 * @param xs {SliceOf<any>>}
 * @returns {SliceOf<any>}
 * @generic
 */
$sliceFrom = (startInd, xs) => $slice(startInd, undefined, xs), 
/**
 * Returns a slice of the given list from `startInd` to the end of the list.
 * @function module:listUtils.sliceFrom
 * @param startInd {Number}
 * @param xs {SliceOf<any>}
 * @returns {SliceOf<any>}
 * @curried
 * @generic
 */
sliceFrom = curry($sliceFrom);
//# sourceMappingURL=sliceFrom.js.map